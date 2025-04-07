// index.js

// Esporta la classe Durable Object
import { ChatRoom } from './durableObjects/ChatRoom.server';
export { ChatRoom };

// L'export default è il punto d'ingresso per il Worker.
// Qui gestisci le richieste HTTP. Puoi anche implementare un router per le varie API.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Esempio: se la richiesta è rivolta all'API della chat room, inoltrala al Durable Object.
    if (url.pathname.startsWith('/api/chatroom')) {
      // Ottieni il nome della stanza dalla query o dal body
      const { roomName } = await request.json().catch(() => ({}));
      if (!roomName) {
        return new Response('Missing roomName', { status: 400 });
      }

      // Usa il binding del Durable Object, che in wrangler.toml hai nominato "CHAT_ROOM"
      // L'ID può essere generato in modo deterministico, per esempio con roomName.
      const id = env.CHAT_ROOM.idFromName(roomName);
      const stub = env.CHAT_ROOM.get(id);

      // Inoltra la richiesta al Durable Object
      return await stub.fetch(request);
    }

    // Fallback: risponde con un messaggio generico
    return new Response('Hello from Cloudflare Worker!', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
