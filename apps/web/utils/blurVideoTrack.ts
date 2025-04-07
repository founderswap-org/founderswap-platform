import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import '@tensorflow/tfjs-backend-webgl';

export default async function blurVideoTrack(
  originalVideoStreamTrack: MediaStreamTrack
) {
  // Creazione del segmenter utilizzando il modello BodyPix
  const segmenter = await bodySegmentation.createSegmenter(
    bodySegmentation.SupportedModels.BodyPix,
    {}
  );

  // Recupera le dimensioni del video dalla traccia originale
  const { height: h = 0, width: w = 0 } =
    originalVideoStreamTrack.getSettings();

  // Crea un elemento video per riprodurre la traccia originale
  const video = document.createElement('video');
  video.height = h;
  video.width = w;
  video.muted = true; // Necessario su iOS Safari
  video.setAttribute('playsinline', '');
  const loaded = new Promise((res) =>
    video.addEventListener('loadedmetadata', res, { once: true })
  );
  const mediaStream = new MediaStream();
  mediaStream.addTrack(originalVideoStreamTrack);
  video.srcObject = mediaStream;
  video.play();
  await loaded;

  // Crea un canvas che verrà usato per applicare l'effetto blur
  const canvas = document.createElement('canvas');
  // Creiamo il contesto per Firefox
  const _context = canvas.getContext('2d');
  canvas.height = h;
  canvas.width = w;

  // Funzione per disegnare l'effetto di bokeh (sfocatura dello sfondo)
  async function drawBlur() {
    const segmentation = await segmenter.segmentPeople(video);
    const foregroundThreshold = 0.6;
    const backgroundBlurAmount = 12;
    const edgeBlurAmount = 3;
    const flipHorizontal = false;

    await bodySegmentation.drawBokehEffect(
      canvas,
      video,
      segmentation,
      foregroundThreshold,
      backgroundBlurAmount,
      edgeBlurAmount,
      flipHorizontal
    );
  }

  // Cattura la traccia video dal canvas con l'effetto applicato
  const blurredTrack = canvas.captureStream().getVideoTracks()[0];

  let t = -1;
  async function tick() {
    await drawBlur();
    t = window.setTimeout(tick, 1000 / 30); // 30fps
  }

  await drawBlur();
  tick();

  // Override del metodo stop della traccia per fermare anche il timeout
  blurredTrack.stop = () => {
    clearTimeout(t);
    MediaStreamTrack.prototype.stop.call(originalVideoStreamTrack);
  };

  // Gestione dell'evento 'ended' sulla traccia originale
  originalVideoStreamTrack.addEventListener('ended', (e) => {
    blurredTrack.stop();
    // Propaga l'evento ended alla traccia sfocata
    blurredTrack.dispatchEvent(e);
  });

  // Le impostazioni della traccia sfocata corrisponderanno a quelle della traccia originale
  blurredTrack.getSettings = () => originalVideoStreamTrack.getSettings();

  return blurredTrack;
}
