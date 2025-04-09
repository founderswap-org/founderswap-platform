import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const roomName = body.roomName;
  if (!roomName) {
    return NextResponse.json({ error: 'Missing roomName' }, { status: 400 });
  }

  const workerUrl = process.env.WORKER_URL;
  const workerResponse = await fetch(`${workerUrl}/api/chatroom`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomName }),
  });
  const data = await workerResponse.json();
  return NextResponse.json(data);
}
