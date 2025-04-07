// src/components/VideoCall.tsx
'use client';

import { useAuth } from '@/context/auth';
import useApi from '@/hooks/useApi';
import {} from '@/hooks/useWebSocket';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';

type MeetingDataType = {
  id: number;
  created_at: string;
  founder1_id: string;
  founder2_id: string;
  meeting_date: string;
  session_id: string | null;
  status: 'scheduled' | 'not_conducted' | 'complete';
};

/**
 * Ricaviamo le variabili d'ambiente.
 * In Next.js, potresti dover usare process.env.NEXT_PUBLIC_ se le usi lato client.
 */

const CF_TURN_TOKEN_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_TURN_TOKEN_ID || '';
const CF_TURN_API_TOKEN =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURN_API_TOKEN || '';

console.log('CF_TURN_TOKEN_ID', CF_TURN_TOKEN_ID);

const CF_CALLS_APP_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_CALLS_APP_ID || '';
const CF_CALLS_API_TOKEN =
  process.env.NEXT_PUBLIC_CLOUDFLARE_CALLS_API_TOKEN || '';

// Endpoint base per Cloudflare Calls
const CALLS_API_BASE = `https://rtc.live.cloudflare.com/v1/apps/${CF_CALLS_APP_ID}`;

// Crea una sessione su Cloudflare Calls
async function createCallsSession(): Promise<string> {
  const res = await fetch(`${CALLS_API_BASE}/sessions/new`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CF_CALLS_API_TOKEN}`,
    },
  }).then((r) => r.json());
  return res.sessionId;
}

// Attende che la ICE connection vada in "connected"
function waitIceConnected(pc: RTCPeerConnection) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error('ICE connection timeout')),
      5000
    );
    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'connected') {
        clearTimeout(t);
        resolve();
      }
    };
  });
}

// Esempio di funzione per ottenere TURN credentials da Cloudflare
// (supponendo tu abbia un endpoint simile a: /client/v4/accounts/:account_id/rtc/turn)
async function fetchCloudflareTurn() {
  // Esempio: potresti aver creato una funzione supabase "cloudflare-turn"
  // che fa la chiamata HTTP usando CLOUDFLARE_TURN_TOKEN_ID e CLOUDFLARE_TURN_API_TOKEN
  // e la invochi con:
  // supabaseClient.functions.invoke("cloudflare-turn", { ... })

  // Oppure chiami direttamente Cloudflare API se esposta:
  const turnTokenId = CF_TURN_TOKEN_ID;
  const turnApiToken = CF_TURN_API_TOKEN;

  if (!turnTokenId || !turnApiToken) {
    throw new Error('Missing TURN token or ID');
  }

  // Esempio di endpoint (non reale) per Cloudflare TURN
  const endpoint = `https://rtc.live.cloudflare.com/v1/turn/keys/${turnTokenId}/credentials/generate`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${turnApiToken}`,
    },
  }).then((r) => r.json());

  return res;
}

/**
 * Componente principale
 */
function VideoCall() {
  const { user } = useAuth();
  const supabaseClient = createClient();
  const { fetchCreateCallSession } = useApi();

  // Riferimenti ai <video>
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Stato
  const [meetingData, setMeetingData] = useState<MeetingDataType | null>(null);
  const [localSessionId, setLocalSessionId] = useState('');
  const [remoteSessionId, setRemoteSessionId] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // 1. Recupera i dati del meeting
    const MEETING_STATUS = 'scheduled';
    const MEETING_CONDITION = `founder1_id.eq.${user.id},founder2_id.eq.${user.id}`;

    const getMeetingData = async () => {
      const { data, error } = await supabaseClient
        .from('meetings')
        .select('*')
        .eq('status', MEETING_STATUS)
        .or(MEETING_CONDITION);

      if (data && data.length > 0) {
        setMeetingData(data[0]);
      }
    };
    getMeetingData();
  }, [supabaseClient, user.id]);

  /**
   * joinCall: Avvia la procedura di:
   * - Verifica/crea session_id su Supabase
   * - (Opzionale) Recupera TURN da Cloudflare
   * - Inizia la logica "push" + "pull" con Cloudflare Calls
   */
  const joinCall = async () => {
    if (!meetingData) {
      alert('Meeting not found');
      return;
    }

    setStatus('checking-session');

    let sessionId = meetingData.session_id;
    const isSessionExists = sessionId != null;
    const isUserAFounder =
      meetingData.founder1_id === user.id ||
      meetingData.founder2_id === user.id;

    // Se non esiste, la creiamo con la funzione (che internamente potrebbe chiamare /sessions/new)
    if (!isSessionExists && isUserAFounder) {
      try {
        const { data: sessionData } = await fetchCreateCallSession();
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          sessionId = parsed.sessionId;
          console.log('New Cloudflare Calls session:', sessionId);

          // Salva nel DB
          const { data, error } = await supabaseClient
            .from('meetings')
            .update({ session_id: sessionId })
            .eq('id', meetingData.id)
            .select();

          if (error) {
            console.error('Error updating meeting:', error.message);
            return;
          }
        }
      } catch (err) {
        console.error('Error creating session on Cloudflare:', err);
        return;
      }
    }

    if (!sessionId) {
      console.error('SESSION ID ISSUE');
      return;
    }

    setLocalSessionId(sessionId);

    // (Opzionale) Recuperiamo le credenziali TURN di Cloudflare
    // Se hai una funzione dedicata tipo "cloudflare-turn", la chiami qui
    try {
      const turnData = await fetchCloudflareTurn();
      console.log('TURN credentials from CF:', turnData);
    } catch (err) {
      console.error('Error fetching CF TURN:', err);
    }

    // Avviamo la procedura di push/pull
    await startCloudflareCalls(sessionId);
  };

  /**
   * startCloudflareCalls: Esempio di "echo" locale.
   */
  const startCloudflareCalls = async (sessionId: string) => {
    try {
      setStatus('getting-user-media');

      // a) Ottieni webcam e mic
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      // b) Crea RTCPeerConnection per "push"
      const localPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.cloudflare.com:3478',
          },
        ],
        bundlePolicy: 'max-bundle',
      });

      localStream.getTracks().forEach((track) => {
        localPeerConnection.addTransceiver(track, { direction: 'sendonly' });
      });

      const offer = await localPeerConnection.createOffer();
      await localPeerConnection.setLocalDescription(offer);

      console.log('CALLS_API_BASE', CALLS_API_BASE);
      console.log('sessionId', sessionId);

      // c) Invia l'offer a Cloudflare Calls
      const pushResponse = await fetch(
        `${CALLS_API_BASE}/sessions/${sessionId}/tracks/new`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CF_CALLS_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionDescription: {
              sdp: offer.sdp,
              type: 'offer',
            },
            tracks: localPeerConnection
              .getTransceivers()
              .map(({ mid, sender }) => ({
                location: 'local',
                mid,
                trackName: sender.track?.id,
              })),
          }),
        }
      ).then((r) => r.json());

      console.log('pushResponse', pushResponse);

      // d) Imposta la remoteDescription (answer da CF)
      await localPeerConnection.setRemoteDescription(
        new RTCSessionDescription(pushResponse.sessionDescription)
      );

      await waitIceConnected(localPeerConnection);
      setStatus('push-connected');

      console.log('Local push connected. Session ID:', sessionId);

      // --- Echo Demo: Creiamo un'altra sessione per "pull" ---
      const remoteSession = await createCallsSession();
      setRemoteSessionId(remoteSession);

      const remotePeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.cloudflare.com:3478',
          },
        ],
        bundlePolicy: 'max-bundle',
      });

      // ontrack → aggiunge i track al remoteStream
      const remoteStream = new MediaStream();
      remotePeerConnection.addEventListener('track', (event) => {
        remoteStream.addTrack(event.track);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      // e) Prepara i track da "pullare"
      const tracksToPull = localPeerConnection
        .getTransceivers()
        .map(({ sender }) => ({
          location: 'remote',
          trackName: sender.track?.id,
          sessionId, // prendiamo i track dalla sessione "locale"
        }));

      // f) /tracks/new per "pull"
      const pullResponse = await fetch(
        `${CALLS_API_BASE}/sessions/${remoteSession}/tracks/new`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CF_CALLS_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tracks: tracksToPull }),
        }
      ).then((r) => r.json());

      // Se serve renegotiation
      if (pullResponse.requiresImmediateRenegotiation) {
        await remotePeerConnection.setRemoteDescription(
          new RTCSessionDescription(pullResponse.sessionDescription)
        );
        const remoteAnswer = await remotePeerConnection.createAnswer();
        await remotePeerConnection.setLocalDescription(remoteAnswer);

        await fetch(`${CALLS_API_BASE}/sessions/${remoteSession}/renegotiate`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${CF_CALLS_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionDescription: {
              sdp: remoteAnswer.sdp,
              type: 'answer',
            },
          }),
        });
      }

      await waitIceConnected(remotePeerConnection);
      setStatus('pull-connected');
      console.log('Remote pull connected. Session ID:', remoteSession);
    } catch (err) {
      console.error('Error in startCloudflareCalls:', err);
      setStatus('error');
    }
  };

  return (
    <div>
      <button onClick={joinCall}>Join Call (Cloudflare Calls)</button>
      <p>Status: {status}</p>

      {status !== 'idle' && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <h2>Local Stream (pushing)</h2>
            <video ref={localVideoRef} autoPlay muted playsInline />
            <p>Local Session ID: {localSessionId}</p>
          </div>
          <div>
            <h2>Remote Stream (pulling / echo)</h2>
            <video ref={remoteVideoRef} autoPlay muted playsInline />
            <p>Remote Session ID: {remoteSessionId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
