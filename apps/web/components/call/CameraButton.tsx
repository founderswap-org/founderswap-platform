import { useRoomContext } from '@/context/room';
import { errorMessageMap } from '@/hooks/useUserMedia';

import { metaKey } from '@/utils/metaKey';
import {
  Button,
  type ButtonProps,
} from '@founderswap/design-system/components/ui/button';
import type { FC } from 'react';
import { useKey } from 'react-use';

import { Tooltip } from '@founderswap/design-system/components/ui/tooltip';
import { Icon } from './icon/Icon';

export const CameraButton: FC<ButtonProps> = ({ onClick, ...rest }) => {
  const {
    userMedia: {
      turnCameraOff,
      turnCameraOn,
      videoEnabled,
      videoUnavailableReason,
    },
  } = useRoomContext();

  const toggle = () => {
    videoEnabled ? turnCameraOff() : turnCameraOn();
  };

  useKey((e) => {
    if (e.key === 'e' && e.metaKey) {
      e.preventDefault();
      return true;
    }
    return false;
  }, toggle);

  const videoUnavailableMessage = videoUnavailableReason
    ? errorMessageMap[videoUnavailableReason]
    : null;

  return (
    <Tooltip
      content={
        videoUnavailableMessage ??
        `Turn camera ${videoEnabled ? 'off' : 'on'} (${metaKey}E)`
      }
    >
      <Button
        variant={videoEnabled ? 'secondary' : 'danger'}
        disabled={!!videoUnavailableMessage}
        onClick={(e) => {
          toggle();
          onClick && onClick(e);
        }}
        {...rest}
      >
        {/* TODO: REPLACE VISUALLY HIDDEN */}
        {/* <VisuallyHidden>
          {videoEnabled ? 'Turn camera off' : 'Turn camera on'}
        </VisuallyHidden> */}
        <Icon type={videoEnabled ? 'videoOn' : 'videoOff'} />
      </Button>
    </Tooltip>
  );
};
