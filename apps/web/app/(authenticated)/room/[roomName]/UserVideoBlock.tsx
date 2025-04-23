//apps/web/app/(authenticated)/room/UserVideoBlock.tsx
import type React from 'react';

type Props = {
  muted?: boolean;
  ref: React.Ref<HTMLVideoElement>;
};

const UserVideoBlock: React.FC<Props> = ({ muted = false, ref }) => {
  return (
    <video
      ref={ref}
      className="h-full w-full scale-x-[-1] rounded bg-black object-cover"
      muted={muted}
      playsInline
    />
  );
};

export default UserVideoBlock;
