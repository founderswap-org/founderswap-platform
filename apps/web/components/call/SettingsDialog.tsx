import { useRoomContext } from '@/context/room';
import type { FC, ReactNode } from 'react';

import { Button } from '@founderswap/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@founderswap/design-system/components/ui/dialog';
import { AudioInputSelector } from './AudioInputSelector';

import { Label } from '@founderswap/design-system/components/ui/label';
import { Toggle } from '@founderswap/design-system/components/ui/toggle';
import { Tooltip } from '@founderswap/design-system/components/ui/tooltip';

import { VideoInputSelector } from './VideoInputSelector';
import { Icon } from './icon/Icon';

interface SettingsDialogProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  children?: ReactNode;
}

export const SettingsButton = () => {
  return (
    <SettingsDialog>
      <Tooltip content="Settings">
        <DialogTrigger asChild>
          <Button className="text-sm" variant="secondary">
            <Icon type="cog" />
          </Button>
        </DialogTrigger>
      </Tooltip>
    </SettingsDialog>
  );
};

export const SettingsDialog: FC<SettingsDialogProps> = ({
  onOpenChange,
  open,
  children,
}) => {
  const {
    userMedia: { blurVideo, setBlurVideo, suppressNoise, setSuppressNoise },
  } = useRoomContext();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <div className="mt-8 grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_1fr]">
          <Label
            className="-mb-2 text-left text-base md:mb-0 md:text-right"
            htmlFor="camera"
          >
            Camera
          </Label>
          <VideoInputSelector id="camera" />
          <Label
            className="-mb-2 text-left text-base md:mb-0 md:text-right"
            htmlFor="mic"
          >
            Mic
          </Label>
          <AudioInputSelector id="mic" />
          <Label
            className="-mb-2 text-left text-base md:mb-0 md:text-right"
            htmlFor="blurBackground"
          >
            Blur Background
          </Label>
          <div>
            <Toggle
              id="blurBackground"
              checked={blurVideo}
              onCheckedChange={setBlurVideo}
            />
          </div>
          <Label
            className="-mb-2 text-left text-base md:mb-0 md:text-right"
            htmlFor="suppressNoise"
          >
            Suppress Noise
          </Label>
          <div>
            <Toggle
              id="suppressNoise"
              checked={suppressNoise}
              onCheckedChange={setSuppressNoise}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
