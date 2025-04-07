// app/api/chatroom/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const roomName = body.roomName;

  // Usa il binding per ottenere l'ID del Durable Object
  // Puoi, ad esempio, usare roomName per ottenere un ID deterministico:
  const id = globalThis.CHAT_ROOM.idFromName(roomName);
  const obj = globalThis.CHAT_ROOM.get(id);

  // Inoltra la richiesta al Durable Object
  const response = await obj.fetch(request);

  // Restituisci la risposta ottenuta dal DO
  return NextResponse.json(await response.json());
}
