//apps/web/context/room/index.tsx

'use client';
import type { UserMedia } from '@/hooks/useUserMedia';
import type usePartySocket from 'partysocket/react';
import type React from 'react';
import {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
} from 'react';

export type RoomContextType = {
  joined: boolean;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
  userMedia: UserMedia;
  iceConnectionState?: RTCIceConnectionState;
  socket?: ReturnType<typeof usePartySocket>;
  videos?: {
    localVideoRef: RefObject<HTMLVideoElement | null>;
    remoteVideoRef: RefObject<HTMLVideoElement | null>;
  };
  remoteStream: MediaStream | null;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({
  children,
  value,
}: { children: ReactNode; value: RoomContextType }) {
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoomContext() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
}
