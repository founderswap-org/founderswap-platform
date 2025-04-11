import { useRoomContext } from '@/context/room';
import { useUserMetadata } from '@/hooks/useUserMetadata';
import type { ClientMessage, User } from '@/types/Messages';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { FC } from 'react';
import AlertDialog from './AlertDialog';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { Icon } from './Icon/Icon';
import { Tooltip } from './Tooltip';

interface MuteUserButtonProps {
  variant?: ButtonProps['variant'];
  mutedvariant?: ButtonProps['variant'];
  user: User;
}

export const MuteUserButton: FC<MuteUserButtonProps> = ({
  user,
  variant = 'secondary',
  mutedvariant = 'danger',
}) => {
  const { room } = useRoomContext();
  const { data } = useUserMetadata(user.name);

  if (user.tracks.audioUnavailable) {
    return (
      <Tooltip content="Mic is unavailable. User cannot unmute.">
        <Button disabled variant="secondary">
          <Icon type="micOff" className="text-red-700 dark:text-red-400" />
          <VisuallyHidden>
            User's mic is unavailable, cannot unmute.
          </VisuallyHidden>
        </Button>
      </Tooltip>
    );
  }

  return (
    <AlertDialog.Root>
      {user.tracks.audioEnabled ? (
        <Tooltip content={`Mute ${data?.displayName}`}>
          <AlertDialog.Trigger asChild>
            <Button variant={variant} disabled={!user.tracks.audioEnabled}>
              <Icon type="micOn" />
            </Button>
          </AlertDialog.Trigger>
        </Tooltip>
      ) : (
        <Tooltip content="Cannot unmute">
          <Button variant={mutedvariant} disabled>
            <Icon type="micOff" />
          </Button>
        </Tooltip>
      )}

      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content
          // If we don't prevent the alert from restoring focus the tooltip
          // will continue to show when we don't want it to.
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <AlertDialog.Title>Mute {data?.displayName}</AlertDialog.Title>
          <AlertDialog.Description>
            They will need to unmute themselves to be heard again.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel asChild>
              <Button className="text-sm" variant="secondary">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                onClick={() => {
                  room.websocket.send(
                    JSON.stringify({
                      type: 'muteUser',
                      id: user.id,
                    } satisfies ClientMessage)
                  );
                }}
                className="text-sm"
                variant="danger"
              >
                Mute
              </Button>
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
