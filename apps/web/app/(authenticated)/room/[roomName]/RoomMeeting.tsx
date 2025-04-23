//apps/web/app/(authenticated)/room/RoomMeeting.tsx

import { useRoomContext } from '@/context/room';
import UserVideoBlock from './UserVideoBlock';

const RoomMeeting = () => {
  const { videos, remoteStream } = useRoomContext();

  return (
    <div className="grid h-full w-full grid-cols-2 gap-4">
      {videos?.localVideoRef && (
        <UserVideoBlock ref={videos?.localVideoRef} muted />
      )}

      {videos?.remoteVideoRef && remoteStream?.active && (
        <UserVideoBlock ref={videos.remoteVideoRef} />
      )}
    </div>
  );
};

export default RoomMeeting;
