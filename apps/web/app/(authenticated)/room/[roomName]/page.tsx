// app/room/[roomName]/page.tsx
import invariant from 'tiny-invariant';
import RoomPageClient from './RoomPageClient';

function numberOrUndefined(value: unknown): number | undefined {
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

export default async function RoomPage({
  params,
}: {
  params: { roomName: string };
}) {
  const { roomName } = await params;
  invariant(roomName, 'roomName is required');

  const {
    TRACE_LINK,
    API_EXTRA_PARAMS,
    MAX_WEBCAM_FRAMERATE,
    MAX_WEBCAM_BITRATE,
    MAX_WEBCAM_QUALITY_LEVEL,
    MAX_API_HISTORY,
    NEXT_PUBLIC_PARTYKIT_HOST,
    FEEDBACK_URL,
    FEEDBACK_QUEUE,
    FEEDBACK_STORAGE,
    NEXT_PUBLIC_ICE_SERVERS,
  } = process.env;

  const props = {
    userDirectoryUrl: NEXT_PUBLIC_PARTYKIT_HOST || null,
    traceLink: TRACE_LINK || null,
    apiExtraParams: API_EXTRA_PARAMS || '',
    iceServers: JSON.parse(NEXT_PUBLIC_ICE_SERVERS!),
    feedbackEnabled: Boolean(
      FEEDBACK_URL && FEEDBACK_QUEUE && FEEDBACK_STORAGE
    ),
    maxWebcamFramerate: numberOrUndefined(MAX_WEBCAM_FRAMERATE),
    maxWebcamBitrate: numberOrUndefined(MAX_WEBCAM_BITRATE),
    maxWebcamQualityLevel: numberOrUndefined(MAX_WEBCAM_QUALITY_LEVEL),
    maxApiHistory: numberOrUndefined(MAX_API_HISTORY),
    roomName,
  };

  return <RoomPageClient {...props} />;
}
