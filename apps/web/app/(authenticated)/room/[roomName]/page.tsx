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
  // Estrai il parametro in una variabile (così non si usa direttamente params.roomName)

  const { roomName } = await params;
  console.log('roomName: ', roomName);

  invariant(roomName, 'roomName is required');
  // Recupera le variabili d'ambiente.
  const {
    TRACE_LINK,
    API_EXTRA_PARAMS,
    MAX_WEBCAM_FRAMERATE,
    MAX_WEBCAM_BITRATE,
    MAX_WEBCAM_QUALITY_LEVEL,
    MAX_API_HISTORY,
    USER_DIRECTORY_URL,
    FEEDBACK_URL,
    FEEDBACK_QUEUE,
    FEEDBACK_STORAGE,
  } = process.env;

  // const iceServers = await getIceServers(process.env);

  const iceServers = [
    {
      urls: 'stun:global.stun.cloudflare.com:3478',
    },
    // Se in futuro decidi di usare anche un server TURN, potresti aggiungere una voce simile a questa:
    // {
    //   urls: 'turn:global.turn.cloudflare.com:3478',
    //   username: 'YOUR_USERNAME',
    //   credential: 'YOUR_CREDENTIAL'
    // }
  ];

  const props = {
    userDirectoryUrl: USER_DIRECTORY_URL || null,
    traceLink: TRACE_LINK || null,
    apiExtraParams: API_EXTRA_PARAMS || '',
    iceServers,
    feedbackEnabled: Boolean(
      FEEDBACK_URL && FEEDBACK_QUEUE && FEEDBACK_STORAGE
    ),
    maxWebcamFramerate: numberOrUndefined(MAX_WEBCAM_FRAMERATE),
    maxWebcamBitrate: numberOrUndefined(MAX_WEBCAM_BITRATE),
    maxWebcamQualityLevel: numberOrUndefined(MAX_WEBCAM_QUALITY_LEVEL),
    maxApiHistory: numberOrUndefined(MAX_API_HISTORY),
    roomName: roomName,
  };

  return <RoomPageClient {...props} />;
}
