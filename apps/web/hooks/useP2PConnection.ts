import type PartySocket from 'partysocket';
import { useEffect, useRef, useState } from 'react';

/**
 * Hook to handle connection WebRTC P2P one-to-one
 * @param socket       WebSocket signaling (partysocket)
 * @param localStream  MediaStream locale (audio/video) or null bofore join
 * @param initiateCall true to send offer when clicked btn join
 */
export function useP2PConnection(
  socket: PartySocket,
  localStream: MediaStream | null,
  initiateCall: boolean
) {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  // Inizializza PeerConnection e signaling una sola volta
  useEffect(() => {
    if (!socket || !localStream) return;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcRef.current = pc;

    // add locals tracks
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    // Create remote stream aggregated
    const remoteStreamRef = new MediaStream();
    setRemoteStream(remoteStreamRef);

    // Get track and add it the the remote stream
    pc.ontrack = ({ track }) => {
      remoteStreamRef.addTrack(track);
      setRemoteStream(new MediaStream(remoteStreamRef.getTracks()));
    };

    // handle ICE candidates
    pc.onicecandidate = ({ candidate }) => {
      if (candidate) socket.send(JSON.stringify({ type: 'ice', candidate }));
    };

    // Signaling: listen messagges
    const handleMessage = async (e: MessageEvent) => {
      // Log raw signaling data
      if (typeof e.data === 'string')
        console.log('[P2P] Received raw:', e.data);
      let data: string;
      if (typeof e.data === 'string') {
        // partySocket prefixes messages with `${senderId}: ${json}`
        const raw = e.data;
        const jsonStart = raw.indexOf('{');
        data = jsonStart >= 0 ? raw.substring(jsonStart) : raw;
      } else {
        return;
      }
      let msg: any;
      try {
        msg = JSON.parse(data);
      } catch (err) {
        console.error('[P2P] Invalid JSON:', data);
        return;
      }
      const pc = pcRef.current;
      if (!pc) return;
      try {
        if (msg.type === 'offer') {
          await pc.setRemoteDescription(msg.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.send(JSON.stringify({ type: 'answer', sdp: answer }));
        } else if (msg.type === 'answer') {
          await pc.setRemoteDescription(msg.sdp);
        } else if (msg.type === 'ice') {
          await pc.addIceCandidate(msg.candidate);
        }
      } catch (err) {
        console.error('Error handling signal', err);
      }
    };
    // Attach listener correctly
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
      pc.close();
      pcRef.current = null;
    };
  }, [socket, localStream]);

  // Invia offer quando initiateCall diventa true
  useEffect(() => {
    const pc = pcRef.current;
    if (initiateCall && pc) {
      (async () => {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.send(JSON.stringify({ type: 'offer', sdp: offer }));
        } catch (err) {
          console.error('Error creating offer', err);
        }
      })();
    }
  }, [initiateCall, socket]);

  return { remoteStream };
}
