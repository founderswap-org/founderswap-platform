'use client';
import type useRoom from '@/hooks/useRoom';
import type { useRoomHistory } from '@/hooks/useRoomHistory';
import type { UserMedia } from '@/hooks/useUserMedia';
import type { PartyTracks } from 'partytracks/client';
import type React from 'react';
import { type ReactNode, createContext, useContext } from 'react';

export type RoomContextType = {
  traceLink?: string;
  feedbackEnabled: boolean;
  userDirectoryUrl?: string;
  joined: boolean;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
  pinnedTileIds: string[];
  setPinnedTileIds: React.Dispatch<React.SetStateAction<string[]>>;
  showDebugInfo: boolean;
  setShowDebugInfo: React.Dispatch<React.SetStateAction<boolean>>;
  dataSaverMode: boolean;
  setDataSaverMode: React.Dispatch<React.SetStateAction<boolean>>;
  userMedia: UserMedia;
  partyTracks: PartyTracks;
  iceConnectionState: RTCIceConnectionState;
  room: ReturnType<typeof useRoom>;
  roomHistory: ReturnType<typeof useRoomHistory>;
  pushedTracks: {
    video?: string;
    audio?: string;
    screenshare?: string;
  };
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
