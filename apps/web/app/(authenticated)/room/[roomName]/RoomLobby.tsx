//apps/web/app/(authenticated)/room/RoomLobby.tsx

import { useRoomContext } from '@/context/room';
import { Button } from '@founderswap/design-system/components/ui/button';
import UserVideoBlock from './UserVideoBlock';

const RoomLobby = () => {
  const { setJoined, videos } = useRoomContext();

  return (
    <div className="flex flex-col items-center gap-4">
      {videos?.localVideoRef && (
        <UserVideoBlock ref={videos?.localVideoRef} muted />
      )}
      <Button type="button" onClick={() => setJoined(true)}>
        Join meeting
      </Button>
    </div>
  );
};

export default RoomLobby;
