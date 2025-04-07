'use client';

import { CameraButton } from '@/components/call/CameraButton';
import { MicButton } from '@/components/call/MicButton';
import { SelfView } from '@/components/call/SelfView';
import { SettingsButton } from '@/components/call/SettingsDialog';
import { Spinner } from '@/components/ui/spinner';

import { useRoomContext } from '@/hooks/useRoomContext';
import { useRoomUrl } from '@/hooks/useRoomUrl';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Tooltip } from '@founderswap/design-system/components/ui/tooltip';
import { useObservableAsValue } from 'partytracks/react';

export default function Lobby() {
  const { setJoined, userMedia, room, partyTracks } = useRoomContext();
  const { videoStreamTrack, audioStreamTrack, audioEnabled } = userMedia;

  const session = useObservableAsValue(partyTracks.session$);
  const sessionError = useObservableAsValue(partyTracks.sessionError$);

  const joinedUsers = new Set(
    room.otherUsers.filter((u) => u.tracks.audio).map((u) => u.name)
  ).size;

  const roomUrl = useRoomUrl();

  console.log('roomUrl: ', roomUrl);

  const roomName = 'NOME STANZA HARDCODED';

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="flex-1" />
      <div className="w-96 space-y-4">
        <div>
          <h1 className="font-bold text-3xl">{roomName}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {`${joinedUsers} ${
              joinedUsers === 1 ? 'user' : 'users'
            } in the room.`}{' '}
          </p>
        </div>
        <div className="relative">
          <SelfView
            className="aspect-[4/3] w-full"
            videoTrack={videoStreamTrack}
          />
          <div className="absolute top-3 left-3">
            {!sessionError && !session?.sessionId ? (
              <Spinner className="text-zinc-100" />
            ) : (
              audioStreamTrack && (
                <>
                  {audioEnabled ? (
                    <AudioIndicator audioTrack={audioStreamTrack} />
                  ) : (
                    <Tooltip content="Mic is turned off">
                      <div className="indication-shadow text-white">
                        <Icon type="micOff" />
                        <VisuallyHidden>Mic is turned off</VisuallyHidden>
                      </div>
                    </Tooltip>
                  )}
                </>
              )
            )}
          </div>
        </div>
        {sessionError && (
          <div className="rounded-md bg-red-200 p-3 text-sm text-zinc-800 dark:bg-red-700 dark:text-zinc-200">
            {sessionError}
          </div>
        )}
        {(userMedia.audioUnavailableReason ||
          userMedia.videoUnavailableReason) && (
          <div className="rounded-md bg-zinc-200 p-3 text-sm text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
            {userMedia.audioUnavailableReason === 'NotAllowedError' &&
              userMedia.videoUnavailableReason === undefined && (
                <p>Mic permission was denied.</p>
              )}
            {userMedia.videoUnavailableReason === 'NotAllowedError' &&
              userMedia.audioUnavailableReason === undefined && (
                <p>Camera permission was denied.</p>
              )}
            {userMedia.audioUnavailableReason === 'NotAllowedError' &&
              userMedia.videoUnavailableReason === 'NotAllowedError' && (
                <p>Mic and camera permissions were denied.</p>
              )}
            {userMedia.audioUnavailableReason === 'NotAllowedError' && (
              <p>
                Enable permission
                {userMedia.audioUnavailableReason &&
                userMedia.videoUnavailableReason
                  ? 's'
                  : ''}{' '}
                and reload the page to join.
              </p>
            )}
            {userMedia.audioUnavailableReason === 'DevicesExhaustedError' && (
              <p>No working microphone found.</p>
            )}
            {userMedia.videoUnavailableReason === 'DevicesExhaustedError' && (
              <p>No working webcam found.</p>
            )}
            {userMedia.audioUnavailableReason === 'UnknownError' && (
              <p>Unknown microphone error.</p>
            )}
            {userMedia.videoUnavailableReason === 'UnknownError' && (
              <p>Unknown webcam error.</p>
            )}
          </div>
        )}
        <div className="flex gap-4 text-sm">
          <Button
            onClick={() => {
              setJoined(true);
              // we navigate here with javascript instead of an a
              // tag because we don't want it to be possible to join
              // the room without the JS having loaded
              //   navigate(
              //     'room' + (params.size > 0 ? '?' + params.toString() : '')
              //   );
            }}
            disabled={!session?.sessionId}
          >
            Join
          </Button>
          <MicButton />
          <CameraButton />
          <SettingsButton />
          <Tooltip content="Copy URL">
            COPIAAA
            {/* <CopyButton contentValue={roomUrl}></CopyButton> */}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
