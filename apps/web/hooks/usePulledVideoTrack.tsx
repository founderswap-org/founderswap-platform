import { useRoomContext } from '@/context/room';
import type { TrackObject } from '@/utils/callsTypes';
import { useObservableAsValue, useValueAsObservable } from 'partytracks/react';
import { useMemo } from 'react';
import { of, switchMap } from 'rxjs';

export function usePulledVideoTrack(video: string | undefined) {
  const { partyTracks } = useRoomContext();

  const [sessionId, trackName] = video?.split('/') ?? [];
  const trackObject = useMemo(
    () =>
      sessionId && trackName
        ? ({
            trackName,
            sessionId,
            location: 'remote',
          } satisfies TrackObject)
        : undefined,
    [sessionId, trackName]
  );

  const trackObject$ = useValueAsObservable(trackObject);
  const pulledTrack$ = useMemo(
    () =>
      trackObject$.pipe(
        switchMap((track) =>
          track ? partyTracks.pull(of(track)) : of(undefined)
        )
      ),
    [partyTracks, trackObject$]
  );
  return useObservableAsValue(pulledTrack$);
}
