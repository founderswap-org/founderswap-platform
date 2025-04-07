'use client';
import { useEffect, useRef, useState } from 'react';

type IceServer = {
  urls: string[];
  username?: string;
  credential?: string;
};

type TurnData = {
  iceServers: IceServer;
};

const WebRTC = () => {
  const [turnData, setTurnData] = useState<TurnData | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchTurnCredentials() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL}/cloudflare-turn`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('TURN API Response:', data);

        setTurnData(data);
      } catch (error) {
        console.error('Error fetching TURN credentials:', error);
      }
    }

    fetchTurnCredentials();
  }, []);

  const startCall = async () => {
    if (!turnData) return;

    try {
      // Se esiste già una connessione, la chiudiamo prima di crearne una nuova
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      const configuration = {
        iceServers: [turnData.iceServers],
      };

      peerConnection.current = new RTCPeerConnection(configuration);
      console.log(
        'PeerConnection initialized with ICE servers configuration:',
        configuration
      );

      // Ottieni lo stream locale dalla webcam e microfono
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      // Aggiungi ogni traccia dello stream locale alla peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.current!.addTrack(track, stream);
      });

      // Quando arriva una traccia remota, la assegniamo allo state
      peerConnection.current.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      // Log degli ICE candidates per il debug
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('ICE Candidate:', event.candidate);
        }
      };

      console.log('Call started!');
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  // Aggiorna il video locale quando lo stream cambia
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Aggiorna il video remoto quando lo stream cambia
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Cleanup: chiude la peer connection e ferma gli stream allo smontaggio del componente
  useEffect(() => {
    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream, remoteStream]);

  return (
    <div>
      <h1>WebRTC Call</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h2>Local Video</h2>
          <video ref={localVideoRef} autoPlay playsInline muted />
        </div>
        <div>
          <h2>Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default WebRTC;
