// durableObjects/ChatRoom.server.ts
/// <reference lib="WebWorker" />

import type { ClientMessage, ServerMessage, User } from '@/types/Messages';
import { assertError } from '@/utils/assertError';
import assertNever from '@/utils/assertNever';
import { log } from '@/utils/logging';
import {} from '@/utils/openai.server';
import type { DurableObjectState } from '@cloudflare/workers-types';
import { eq, sql } from 'drizzle-orm';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import {
  type Connection,
  type ConnectionContext,
  Server,
  type WSMessage,
} from 'partyserver';
import { Meetings, getDb } from 'schema';
import type { Env } from 'types/Env';

const alarmInterval = 15_000;
const defaultOpenAIModelID = 'gpt-4o-realtime-preview-2024-10-01';

export class ChatRoom extends Server<Env> {
  env: Env;
  db: DrizzleD1Database<Record<string, never>> | null;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx as any, env);
    this.env = env;
    this.db = getDb(this);
  }

  sendMessage<M extends ServerMessage>(connection: Connection, message: M) {
    connection.send(JSON.stringify(message));
  }

  async onStart(): Promise<void> {
    const meetingId = await this.getMeetingId();
    log({ eventName: 'onStart', meetingId });
    this.db = getDb(this);
  }

  async onRequest(request: Request): Promise<Response> {
    const meetingId = await this.getMeetingId();
    const roomState = {
      meetingId,
    };
    return new Response(JSON.stringify(roomState), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async onConnect(
    connection: Connection<User>,
    ctx: ConnectionContext
  ): Promise<void> {
    if (!(await this.ctx.storage.getAlarm())) {
      this.ctx.storage.setAlarm(Date.now() + alarmInterval);
    }
    const username = 'USERNAME';

    let user = await this.ctx.storage.get<User>(`session-${connection.id}`);
    const foundInStorage = user !== undefined;
    if (!foundInStorage) {
      user = {
        id: connection.id,
        name: username,
        joined: false,
        raisedHand: false,
        speaking: false,
        tracks: {
          audioEnabled: false,
          audioUnavailable: false,
          videoEnabled: false,
          screenShareEnabled: false,
        },
      };
    }
    await this.ctx.storage.put(`session-${connection.id}`, user);
    await this.ctx.storage.put(`heartbeat-${connection.id}`, Date.now());
    await this.trackPeakUserCount();
    await this.broadcastRoomState();
    const meetingId = await this.getMeetingId();
    log({
      eventName: 'onConnect',
      meetingId,
      foundInStorage,
      connectionId: connection.id,
    });
  }

  async trackPeakUserCount() {
    const meetingId = await this.getMeetingId();
    const meeting = meetingId
      ? await this.getMeeting(meetingId)
      : await this.createMeeting();
    await this.cleanupOldConnections();
    if (this.db) {
      if (!meeting) return;
      if (meeting.ended !== null) {
        await this.db
          .update(Meetings)
          .set({ ended: null })
          .where(eq(Meetings.id, meeting.id));
      }
      const previousCount = meeting.peakUserCount;
      const userCount = (await this.getUsers()).size;
      if (userCount > previousCount) {
        await this.db
          .update(Meetings)
          .set({ peakUserCount: userCount })
          .where(eq(Meetings.id, meeting.id));
      }
    }
    return meetingId;
  }

  async getMeetingId() {
    const meetingId = await crypto.randomUUID();
    return meetingId;
    // return this.ctx.storage.get<string>('meetingId');
  }

  async createMeeting() {
    const meetingId = crypto.randomUUID();
    await this.ctx.storage.put('meetingId', meetingId);
    log({ eventName: 'startingMeeting', meetingId });
    if (this.db) {
      return this.db
        .insert(Meetings)
        .values({ id: meetingId, peakUserCount: 1 })
        .returning()
        .then(([m]) => m);
    }
  }

  async getMeeting(meetingId: string) {
    if (!this.db) return null;
    const [meeting] = await this.db
      .select()
      .from(Meetings)
      .where(eq(Meetings.id, meetingId));
    return meeting;
  }

  async broadcastRoomState() {
    let didSomeoneQuit = false;
    const meetingId = await this.getMeetingId();
    const aiEnabled =
      (await this.ctx.storage.get<boolean>('ai:enabled')) ?? false;
    const aiSessionId =
      (await this.ctx.storage.get<string>('ai:sessionId')) ?? undefined;
    const aiAudioTrack =
      (await this.ctx.storage.get<string>('ai:trackName')) ?? undefined;
    const roomState: ServerMessage = {
      type: 'roomState',
      state: {
        ai: {
          enabled: aiEnabled,
          controllingUser:
            await this.ctx.storage.get<string>('ai:userControlling'),
          connectionPending: await this.ctx.storage.get<boolean>(
            'ai:connectionPending'
          ),
          error: await this.ctx.storage.get<string>('ai:error'),
        },
        meetingId,
        users: [
          ...(await this.getUsers()).values(),
          ...(aiEnabled
            ? [
                {
                  id: 'ai',
                  name: 'AI',
                  joined: true,
                  raisedHand: false,
                  transceiverSessionId: aiSessionId,
                  speaking: false,
                  tracks: {
                    audioEnabled: true,
                    audio: aiSessionId + '/' + aiAudioTrack,
                    audioUnavailable: false,
                    videoEnabled: false,
                    screenShareEnabled: false,
                  },
                } as User,
              ]
            : []),
        ],
      },
    };
    const roomStateMessage = JSON.stringify(roomState);
    for (const connection of this.getConnections()) {
      try {
        connection.send(roomStateMessage);
      } catch (err) {
        connection.close(1011, 'Failed to broadcast state');
        log({
          eventName: 'errorBroadcastingToUser',
          meetingId,
          connectionId: connection.id,
        });
        await this.ctx.storage.delete(`session-${connection.id}`);
        didSomeoneQuit = true;
      }
    }
    if (didSomeoneQuit) {
      await this.broadcastRoomState();
    }
  }

  async onClose(
    connection: Connection,
    code: number,
    reason: string,
    wasClean: boolean
  ) {
    const meetingId = await this.getMeetingId();
    log({
      eventName: 'onClose',
      meetingId,
      connectionId: connection.id,
      code,
      reason,
      wasClean,
    });
  }

  async onMessage(
    connection: Connection<User>,
    message: WSMessage
  ): Promise<void> {
    try {
      const meetingId = await this.getMeetingId();
      if (typeof message !== 'string') {
        console.warn('Received non-string message');
        return;
      }
      const data: ClientMessage = JSON.parse(message);
      switch (data.type) {
        case 'userLeft': {
          connection.close(1000, 'User left');
          await this.ctx.storage
            .delete(`session-${connection.id}`)
            .catch(() => {
              console.warn(
                `Failed to delete session-${connection.id} on userLeft`
              );
            });
          await this.ctx.storage
            .delete(`heartbeat-${connection.id}`)
            .catch(() => {
              console.warn(
                `Failed to delete heartbeat-${connection.id} on userLeft`
              );
            });
          log({
            eventName: 'userLeft',
            meetingId,
            connectionId: connection.id,
          });
          await this.broadcastRoomState();
          break;
        }
        case 'userUpdate': {
          this.ctx.storage.put(`session-${connection.id}`, data.user);
          await this.broadcastRoomState();
          break;
        }
        case 'directMessage': {
          const { to, message } = data;
          const fromUser = await this.ctx.storage.get<User>(
            `session-${connection.id}`
          );
          for (const otherConnection of this.getConnections<User>()) {
            if (otherConnection.id === to) {
              this.sendMessage(otherConnection, {
                type: 'directMessage',
                from: fromUser!.name,
                message,
              });
              break;
            }
          }
          console.warn(
            `User with id "${to}" not found, cannot send DM from "${fromUser!.name}"`
          );
          break;
        }
        default: {
          assertNever(data as never);
          break;
        }
      }
    } catch (error) {
      const meetingId = await this.getMeetingId();
      log({
        eventName: 'errorHandlingMessage',
        meetingId,
        connectionId: connection.id,
        error,
      });
      assertError(error);
      this.sendMessage(connection, {
        type: 'error',
        error: error instanceof Error ? error.stack : String(error),
      } as ServerMessage);
    }
  }

  onError(connection: Connection, error: unknown): void | Promise<void> {
    log({ eventName: 'onErrorHandler', error });
    return this.getMeetingId().then((meetingId) => {
      log({
        eventName: 'onErrorHandlerDetails',
        meetingId,
        connectionId: connection.id,
        error,
      });
      this.broadcastRoomState();
    });
  }

  getUsers() {
    return this.ctx.storage.list<User>({ prefix: 'session-' });
  }

  async endMeeting(meetingId: string) {
    log({ eventName: 'endingMeeting', meetingId });
    if (this.db) {
      await this.db
        .update(Meetings)
        .set({ ended: sql`CURRENT_TIMESTAMP` })
        .where(eq(Meetings.id, meetingId));
    }
    await this.ctx.storage.deleteAll();
  }

  async cleanupOldConnections() {
    const meetingId = await this.getMeetingId();
    if (!meetingId) log({ eventName: 'meetingIdNotFoundInCleanup' });
    const now = Date.now();
    const users = await this.getUsers();
    let removedUsers = 0;
    const connections = [...this.getConnections()];
    for (const [key, user] of users) {
      const connectionId = key.replace('session-', '');
      const heartbeat = await this.ctx.storage.get<number>(
        `heartbeat-${connectionId}`
      );
      if (heartbeat === undefined || heartbeat + alarmInterval < now) {
        removedUsers++;
        await this.ctx.storage.delete(key).catch(() => {
          console.warn(
            `Failed to delete session ${key} in cleanupOldConnections`
          );
        });
        const connection = connections.find((c) => c.id === connectionId);
        if (connection) {
          connection.close(1011);
        }
        log({ eventName: 'userTimedOut', connectionId: user.id, meetingId });
      }
    }
    const activeUserCount = (await this.getUsers()).size;
    if (meetingId && activeUserCount === 0) {
      this.endMeeting(meetingId);
    } else if (removedUsers > 0) {
      this.broadcastRoomState();
    }
    return activeUserCount;
  }

  async alarm(): Promise<void> {
    const meetingId = await this.getMeetingId();
    log({ eventName: 'alarm', meetingId });
    const activeUserCount = await this.cleanupOldConnections();
    await this.broadcastRoomState();
    if (activeUserCount !== 0) {
      this.ctx.storage.setAlarm(Date.now() + alarmInterval);
    }
  }
}
