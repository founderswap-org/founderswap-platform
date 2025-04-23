// apps/party-server/src/server.ts
import type * as Party from 'partykit/server';

export class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected:
        id: ${conn.id}
        room: ${this.room.id}
        url: ${new URL(ctx.request.url).pathname}`
    );

    // manda un messaggio di benvenuto
    conn.send('hello from server');

    // (opzionale) notifica agli altri che un utente si è unito
    this.room.broadcast(JSON.stringify({ type: 'user-joined', id: conn.id }), [
      conn.id,
    ]);
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);

    // broadcast a tutti tranne chi ha inviato
    this.room.broadcast(`${sender.id}: ${message}`, [sender.id]);
  }

  onDisconnect?(conn: Party.Connection) {
    console.log(`Disconnected:
      id: ${conn.id}
      room: ${this.room.id}`);

    // notifica a tutti che un utente se n'è andato
    this.room.broadcast(JSON.stringify({ type: 'user-left', id: conn.id }));
  }
}

// default export per `partykit dev` / partykit.dev
export default Server;

// verifica a TypeScript che Server implementa l'interfaccia Worker
Server satisfies Party.Worker;
