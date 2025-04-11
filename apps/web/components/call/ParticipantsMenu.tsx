import { useRoomContext } from '@/context/room';
import { useUserMetadata } from '@/hooks/useUserMetadata';
import type { User } from '@/types/Messages';
import populateTraceLink from '@/utils/populateTraceLink';
import { cn } from '@/utils/style';
import type { FC, ReactNode } from 'react';
import { AudioIndicator } from './AudioIndicator';
import { Button } from './Button';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  Portal,
  Trigger,
} from './Dialog';
import { Icon } from './Icon/Icon';
import { MuteUserButton } from './MuteUserButton';
import { OptionalLink } from './OptionalLink';
import { usePulledAudioTrack } from './PullAudioTracks';
import { Tooltip } from './Tooltip';

const UserListItem: FC<{
  user: User;
  audioTrack?: MediaStreamTrack;
  children?: ReactNode;
}> = ({ user, audioTrack }) => {
  const { traceLink } = useRoomContext();
  const { data } = useUserMetadata(user.name);
  return (
    <li className="flex h-9 items-center gap-4 text-base">
      <div className="mr-auto overflow-hidden text-ellipsis whitespace-nowrap">
        <OptionalLink
          href={
            user.transceiverSessionId
              ? populateTraceLink(user.transceiverSessionId, traceLink)
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {data?.displayName}
        </OptionalLink>
      </div>
      {audioTrack && user.tracks.audioEnabled && (
        <div className="px-5">
          <AudioIndicator audioTrack={audioTrack} />
        </div>
      )}
      <MuteUserButton user={user} />
    </li>
  );
};

const OtherUser: FC<{ user: User }> = ({ user }) => {
  const audioTrack = usePulledAudioTrack(user.tracks.audio);
  return <UserListItem user={user} audioTrack={audioTrack}></UserListItem>;
};

export const participantCount = (count: number) =>
  `${count} Participant${count > 1 ? 's' : ''}`;

interface ParticipantDialogProps {
  children?: ReactNode;
  otherUsers: User[];
  identity?: User;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ParticipantsButton: FC<
  Omit<ParticipantDialogProps, 'children'> & {
    className?: string;
  }
> = ({ className, ...rest }) => {
  const {
    room: { otherUsers },
  } = useRoomContext();
  return (
    <ParticipantsDialog {...rest}>
      <Tooltip content={participantCount(otherUsers.length + 1)}>
        <Trigger asChild>
          <Button className={cn('relative', className)} variant="secondary">
            <Icon type="userGroup" />
          </Button>
        </Trigger>
      </Tooltip>
    </ParticipantsDialog>
  );
};

export const ParticipantsDialog: FC<ParticipantDialogProps> = ({
  children,
  otherUsers,
  identity,
  open,
  onOpenChange,
}) => {
  const { userMedia } = useRoomContext();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}

      <Portal>
        <DialogOverlay />
        <DialogContent>
          <div className="space-y-4">
            <h2 className="font-bold text-xl">
              {participantCount(otherUsers.length + 1)}
            </h2>
            <ul className="space-y-2">
              {identity && (
                <UserListItem
                  user={identity}
                  audioTrack={userMedia.audioStreamTrack}
                >
                  {identity.name}
                </UserListItem>
              )}
              {otherUsers.map((u) => (
                <OtherUser user={u} key={u.id} />
              ))}
            </ul>
          </div>
        </DialogContent>
      </Portal>
    </Dialog>
  );
};
