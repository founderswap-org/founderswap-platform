'use client';
import { RoomProvider } from '@/hooks/useRoomContext';
import Lobby from './lobby';

export default function Page() {
  const roomContextValue = {
    // provide all the required values, e.g.,
    joined: false,
    setJoined: () => {},
    pinnedTileIds: [],
    setPinnedTileIds: () => {},
    showDebugInfo: false,
    setShowDebugInfo: () => {},
    dataSaverMode: false,
    setDataSaverMode: () => {},
    userMedia: {
      /* your userMedia values */
    },
    partyTracks: {
      /* your partyTracks values */
    },
    iceConnectionState: 'new',
    room: {
      /* your room values */
    },
    roomHistory: {
      /* your room history values */
    },
    pushedTracks: {},
  };

  return (
    <RoomProvider value={roomContextValue}>
      <Lobby />
    </RoomProvider>
  );
}
