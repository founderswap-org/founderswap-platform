/// <reference lib="WebWorker" />
import { getServerByName } from 'partyserver';
import { ChatRoom } from './durableObjects/ChatRoom.server';

export { ChatRoom };

export default {
  async fetch(
    request: Request,
    env: any,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/chatroom')) {
      const upgradeHeader = request.headers.get('upgrade')?.toLowerCase();
      if (upgradeHeader === 'websocket') {
        const roomName = url.searchParams.get('roomName');
        if (!roomName) {
          return new Response('Missing roomName', { status: 400 });
        }

        const newHeaders = new Headers(request.headers);

        newHeaders.set('x-party-namespace', 'rooms');
        newHeaders.set('x-party-room', roomName);

        const newRequest = new Request(request.url, {
          method: request.method,
          headers: newHeaders,
        });

        const stub = await getServerByName(env.rooms, roomName);
        return await stub.fetch(newRequest);
      } else {
        const reqClone = request.clone();
        let roomName: string | undefined;
        try {
          const body = (await reqClone.json()) as { roomName?: string };
          roomName = body.roomName;
        } catch (err) {
          return new Response('Invalid JSON', { status: 400 });
        }
        if (!roomName) {
          return new Response('Missing roomName', { status: 400 });
        }

        const newHeaders = new Headers(request.headers);
        newHeaders.set('x-party-namespace', 'rooms');
        newHeaders.set('x-party-room', roomName);
        newHeaders.delete('upgrade');

        const newRequest = new Request(request.url, {
          method: request.method,
          headers: newHeaders,
          body: JSON.stringify({ roomName }),
        });
        const stub = await getServerByName(env.rooms, roomName);
        return await stub.fetch(newRequest);
      }
    }
    return new Response('Hello from Cloudflare Worker!', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
