import { cn } from '@founderswap/design-system/lib/utils';

import {
  Bug,
  Camera,
  CameraOff,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleAlert,
  Clipboard,
  ClipboardCheck,
  Cog,
  EllipsisVerticalIcon,
  Expand,
  Hand,
  Mic,
  MicOff,
  MinusIcon,
  PhoneMissed,
  PlusIcon,
  ScreenShare,
  Server,
  Signal,
  SignalLow,
  SquareArrowDown,
  SquareArrowUp,
  Users,
  Wifi,
  XCircleIcon,
} from 'lucide-react';
import type { FC } from 'react';

const iconMap = {
  micOn: Mic,
  micOff: MicOff,
  videoOn: Camera,
  videoOff: CameraOff,
  screenshare: ScreenShare,
  arrowsOut: Expand,
  arrowsIn: Expand,
  cog: Cog,
  xCircle: XCircleIcon,
  bug: Bug,
  phoneXMark: PhoneMissed,
  handRaised: Hand,
  userGroup: Users,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ClipboardDocumentCheckIcon: ClipboardCheck,
  ClipboardDocumentIcon: Clipboard,
  SignalIcon: Signal,
  SignalSlashIcon: SignalLow,
  ExclamationCircleIcon: CircleAlert,
  ServerStackIcon: Server,
  ArrowDownOnSquareIcon: SquareArrowDown,
  ArrowUpOnSquareIcon: SquareArrowUp,
  WifiIcon: Wifi,
};

interface IconProps {
  type: keyof typeof iconMap;
}

export const Icon: FC<
  IconProps & Omit<JSX.IntrinsicElements['svg'], 'ref'>
> = ({ type, className, ...rest }) => {
  const Component = iconMap[type];
  return <Component className={cn('h-[1em]', className)} {...rest} />;
};
