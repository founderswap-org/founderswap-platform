// app/room/[roomName]/RoomPageClient.tsx
'use client';

import { EnsureOnline } from '@/components/call/EnsureOnline';
import { EnsurePermissions } from '@/components/call/EnsurePermissions';
import { Spinner } from '@/components/call/Spinner';
import { Icon } from '@/components/call/icon/Icon';
import { RoomProvider } from '@/context/room';
import { usePeerConnection } from '@/hooks/usePeerConnection';
import useRoom from '@/hooks/useRoom';
import { useRoomHistory } from '@/hooks/useRoomHistory';
import { useStablePojo } from '@/hooks/useStablePojo';
import useUserMedia from '@/hooks/useUserMedia';
import { useObservableAsValue, useValueAsObservable } from 'partytracks/react';
import { useMemo, useState } from 'react';
import { from, of, switchMap } from 'rxjs';
import invariant from 'tiny-invariant';
import Lobby from './Lobby';

function trackObjectToString(trackObject?: {
  sessionId: string;
  trackName: string;
}) {
  if (!trackObject) return undefined;
  return trackObject.sessionId + '/' + trackObject.trackName;
}

export default function RoomPageClient(props: {
  roomName: string;
  userDirectoryUrl?: string;
  traceLink?: string;
  apiExtraParams: string;
  iceServers: any;
  feedbackEnabled: boolean;
  maxWebcamFramerate?: number;
  maxWebcamBitrate?: number;
  maxWebcamQualityLevel?: number;
  maxApiHistory?: number;
}) {
  const {
    roomName,
    userDirectoryUrl,
    traceLink,
    apiExtraParams,
    iceServers,
    feedbackEnabled,
    maxWebcamFramerate = 24,
    maxWebcamBitrate = 1_200_000,
    maxWebcamQualityLevel = 1080,
    maxApiHistory = 100,
  } = props;

  invariant(roomName, 'roomName is required');

  // Inizializza gli hook per i media e per la room.
  const userMedia = useUserMedia();
  const room = useRoom({ roomName, userMedia });

  room.roomState.meetingId = roomName;
  // Se il meeting non è ancora pronto, mostra uno spinner.
  // TODO: find an alternative to check if the meeting is ready:
  if (!room.roomState.meetingId) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner className="text-gray-500" />
      </div>
    );
  }

  const [joined, setJoined] = useState(false);
  const [dataSaverMode, setDataSaverMode] = useState(false);

  // Prepara i parametri per il peer connection.
  const params = new URLSearchParams(apiExtraParams);
  invariant(room.roomState.meetingId, 'Meeting ID cannot be missing');
  params.set('correlationId', room.roomState.meetingId);

  const { partyTracks, iceConnectionState } = usePeerConnection({
    maxApiHistory,
    apiExtraParams: params.toString(),
    iceServers,
  });

  const roomHistory = useRoomHistory(partyTracks, room);

  // Calcola il downscaling della risoluzione in base alle dimensioni del video.
  const scaleResolutionDownBy = useMemo(() => {
    const videoStreamTrack = userMedia.videoStreamTrack;
    const { height, width } = tryToGetDimensions(videoStreamTrack);
    const smallestDimension = Math.min(height, width);
    return Math.max(smallestDimension / maxWebcamQualityLevel, 1);
  }, [maxWebcamQualityLevel, userMedia.videoStreamTrack]);

  const videoEncodingParams = useStablePojo([
    {
      maxFramerate: maxWebcamFramerate,
      maxBitrate: maxWebcamBitrate,
      scaleResolutionDownBy,
    },
  ]);

  const videoTrackEncodingParams$ = useValueAsObservable(videoEncodingParams);

  const pushedVideoTrack$ = useMemo(
    () => partyTracks.push(userMedia.videoTrack$, videoTrackEncodingParams$),
    [partyTracks, userMedia.videoTrack$, videoTrackEncodingParams$]
  );
  const pushedVideoTrack = useObservableAsValue(pushedVideoTrack$);

  const pushedAudioTrack$ = useMemo(
    () =>
      partyTracks.push(
        userMedia.publicAudioTrack$,
        of([
          {
            networkPriority: 'high',
          },
        ])
      ),
    [partyTracks, userMedia.publicAudioTrack$]
  );
  const pushedAudioTrack = useObservableAsValue(pushedAudioTrack$);

  const pushedScreenSharingTrack$ = useMemo(() => {
    return userMedia.screenShareVideoTrack$.pipe(
      switchMap((track) =>
        track ? from(partyTracks.push(of(track))) : of(undefined)
      )
    );
  }, [partyTracks, userMedia.screenShareVideoTrack$]);
  const pushedScreenSharingTrack = useObservableAsValue(
    pushedScreenSharingTrack$
  );

  const [pinnedTileIds, setPinnedTileIds] = useState<string[]>([]);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Prepara il valore del contesto da passare ai figli.
  const contextValue = {
    joined,
    setJoined,
    pinnedTileIds,
    setPinnedTileIds,
    showDebugInfo,
    setShowDebugInfo,
    dataSaverMode,
    setDataSaverMode,
    traceLink,
    userMedia,
    userDirectoryUrl,
    feedbackEnabled,
    partyTracks,
    roomHistory,
    iceConnectionState,
    room,
    pushedTracks: {
      video: trackObjectToString(pushedVideoTrack),
      audio: trackObjectToString(pushedAudioTrack),
      screenshare: trackObjectToString(pushedScreenSharingTrack),
    },
  };

  return (
    <EnsurePermissions>
      <EnsureOnline
        fallback={
          <div className="grid h-full place-items-center">
            <div>
              <h1 className="flex items-center gap-3 font-black text-3xl">
                <Icon type="SignalSlashIcon" />
                You are offline
              </h1>
            </div>
          </div>
        }
      >
        <RoomProvider value={contextValue}>
          {/* Qui puoi decidere di visualizzare la Lobby oppure il contenuto della Room */}
          <Lobby />
          Lobby qui
        </RoomProvider>
      </EnsureOnline>
    </EnsurePermissions>
  );
}

// Funzione di utilità per ottenere le dimensioni dal MediaStreamTrack
function tryToGetDimensions(videoStreamTrack?: MediaStreamTrack) {
  if (
    !videoStreamTrack ||
    typeof videoStreamTrack.getCapabilities !== 'function'
  ) {
    return { height: 0, width: 0 };
  }
  const capabilities = videoStreamTrack.getCapabilities();
  const height = capabilities.height?.max ?? 0;
  const width = capabilities.width?.max ?? 0;
  return { height, width };
}
