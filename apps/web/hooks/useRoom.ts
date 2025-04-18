import type { ClientMessage, RoomState, ServerMessage } from '@/types/messages';
import assertNever from '@/utils/assertNever';
import { useEffect, useMemo, useRef, useState } from 'react';

import usePartySocket from 'partysocket/react';
import type { UserMedia } from './useUserMedia';

export default function useRoom({
  roomName,
  userMedia,
}: {
  roomName: string;
  userMedia: UserMedia;
}) {
  const [roomState, setRoomState] = useState<RoomState>({
    users: [],
    ai: { enabled: false },
  });

  const userLeftFunctionRef = useRef(() => {});

  useEffect(() => {
    return () => userLeftFunctionRef.current();
  }, []);

  const websocket = usePartySocket({
    // party: 'main',
    room: roomName,
    host: process.env.NEXT_PUBLIC_WS_HOST!,
    onMessage: (e) => {
      console.log('e.data:', e.data);

      const input = e.data;

      // Trova la posizione della prima occorrenza di '{'
      const jsonStartIndex = input.indexOf('{');

      let jsonData;
      if (jsonStartIndex !== -1) {
        // Estrai la parte JSON della stringa
        const jsonStr = input.substring(jsonStartIndex);

        // Prova a parsare la stringa JSON
        try {
          jsonData = JSON.parse(jsonStr);
          console.log('JSON parsed:', jsonData);
        } catch (error) {
          console.error('Errore nel parsing della stringa JSON:', error);
        }
      }

      const message = jsonData as ServerMessage;

      if (message) {
        switch (message.type) {
          case 'roomState':
            // prevent updating state if nothing has changed
            if (JSON.stringify(message.state) === JSON.stringify(roomState))
              break;
            setRoomState(message.state);
            break;
          case 'error':
            console.error('Received error message from WebSocket');
            console.error(message.error);
            break;
          case 'directMessage':
            break;
          case 'muteMic':
            userMedia.turnMicOff();
            break;
          case 'partyserver-pong':
          case 'aiSdp':
            // do nothing
            break;

          default:
            assertNever(message);
            break;
        }
      }
    },
  });

  userLeftFunctionRef.current = () =>
    websocket.send(
      JSON.stringify({ type: 'userLeft' } satisfies ClientMessage)
    );

  useEffect(() => {
    function onBeforeUnload() {
      userLeftFunctionRef.current();
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [websocket]);

  const identity = useMemo(
    () => roomState.users.find((u) => u.id === websocket.id),
    [roomState.users, websocket.id]
  );

  const otherUsers = useMemo(
    () => roomState.users.filter((u) => u.id !== websocket.id && u.joined),
    [roomState.users, websocket.id]
  );

  return { identity, otherUsers, websocket, roomState };
}
