import { forwardRef } from 'react';

import { cn } from '@founderswap/design-system/lib/utils';
import { VideoSrcObject, type VideoSrcObjectProps } from './VideoSrcObject';

export const SelfView = forwardRef<HTMLVideoElement, VideoSrcObjectProps>(
  ({ className, ...rest }, ref) => (
    <VideoSrcObject
      className={cn('-scale-x-100', className)}
      muted
      {...rest}
      ref={ref}
    />
  )
);

SelfView.displayName = 'SelfView';
