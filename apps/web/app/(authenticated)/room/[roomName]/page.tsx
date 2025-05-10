// app/room/[roomName]/page.tsx
export const runtime = 'edge';

import invariant from 'tiny-invariant';
import RoomPageClient from './RoomPageClient';

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  invariant(roomName, 'roomName is required');

  return <RoomPageClient roomName={roomName} />;
}
