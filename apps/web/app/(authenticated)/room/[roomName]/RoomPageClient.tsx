//apps/web/app/(authenticated)/room/RoomPageClient.tsx
'use client';

import { Spinner } from '@/components/call/Spinner';
import { RoomProvider } from '@/context/room';
import { useP2PConnection } from '@/hooks/useP2PConnection';
import useUserMedia from '@/hooks/useUserMedia';
import usePartySocket from 'partysocket/react';
import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import RoomLobby from './RoomLobby';
import RoomMeeting from './RoomMeeting';

export default function RoomPageClient({ roomName }: { roomName: string }) {
  invariant(roomName, 'roomName is required');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // 1) Get local tracks
  const userMedia = useUserMedia();
  const {
    audioStreamTrack,
    videoStreamTrack,
    audioUnavailableReason,
    videoUnavailableReason,
  } = userMedia;

  // 2) Create local MediaStream
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!audioStreamTrack && !videoStreamTrack) return;
    const s = new MediaStream();
    if (audioStreamTrack) s.addTrack(audioStreamTrack);
    if (videoStreamTrack) s.addTrack(videoStreamTrack);
    setLocalStream(s);
  }, [audioStreamTrack, videoStreamTrack]);

  // 3) Signaling via WebSocket
  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_WS_HOST!,
    room: roomName,
  });

  const [joined, setJoined] = useState(false);
  const { remoteStream } = useP2PConnection(
    socket,
    joined ? localStream : null,
    joined
  );

  // 6) Set srcObject e play
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play().catch(() => {});
    }
  }, [localStream, joined]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play().catch(() => {});
    }
  }, [remoteStream, joined]);

  // 7) Loading / grants
  if (!localStream) {
    const reason = audioUnavailableReason || videoUnavailableReason;
    return (
      <div className="grid h-full place-items-center">
        {reason ? (
          <div className="rounded bg-red-100 p-4 text-red-800">{reason}</div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }

  return (
    <RoomProvider
      value={{
        joined,
        setJoined,
        userMedia,
        remoteStream,
        videos: {
          localVideoRef,
          remoteVideoRef,
        },
      }}
    >
      <div className="flex h-full flex-col items-center justify-center p-4">
        {joined ? <RoomMeeting /> : <RoomLobby />}
      </div>
    </RoomProvider>
  );
}
