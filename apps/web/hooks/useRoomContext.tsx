'use client';

import type { UserMedia } from '@/hooks/useUserMedia';
import type { PartyTracks } from 'partytracks/client';
import { type ReactNode, createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type useRoom from './useRoom';
import type { useRoomHistory } from './useRoomHistory';

export type RoomContextType = {
  traceLink?: string;
  feedbackEnabled: boolean;
  userDirectoryUrl?: string;
  joined: boolean;
  setJoined: Dispatch<SetStateAction<boolean>>;
  pinnedTileIds: string[];
  setPinnedTileIds: Dispatch<SetStateAction<string[]>>;
  showDebugInfo: boolean;
  setShowDebugInfo: Dispatch<SetStateAction<boolean>>;
  dataSaverMode: boolean;
  setDataSaverMode: Dispatch<SetStateAction<boolean>>;
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

type RoomProviderProps = {
  children: ReactNode;
  value?: RoomContextType;
};

export const RoomProvider = ({ children, value }: RoomProviderProps) => {
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export function useRoomContext() {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error(
      "useRoomContext deve essere usato all'interno di un RoomProvider"
    );
  }
  return context;
}
