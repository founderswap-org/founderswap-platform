

/**
 * Mappa globale di client connessi, dove la chiave è l'ID univoco del client,
 * e il valore è la WebSocket.
 */
const clients = new Map<string, WebSocket>();

/**
 * Funzione di supporto per inviare un messaggio JSON a un socket.
 */
function sendJSON(socket: WebSocket, data: unknown) {
    socket.send(JSON.stringify(data));
}

Deno.serve((req) => {
    // Verifica che la richiesta stia tentando l'upgrade a WebSocket
    const upgradeHeader = req.headers.get("upgrade") || "";
    if (upgradeHeader.toLowerCase() !== "websocket") {
        return new Response("Richiesta non valida: manca l'upgrade a WebSocket.", {
            status: 400,
        });
    }

    // Esegui l'upgrade della connessione a WebSocket
    const { socket, response } = Deno.upgradeWebSocket(req);

    // Generiamo un ID univoco per il client
    const clientId = crypto.randomUUID();

    socket.onopen = () => {
        console.log(`Client connesso: ${clientId}`);
        // Salviamo il socket nella mappa
        clients.set(clientId, socket);

        // Inviamo al client il proprio ID (messaggio di init)
        sendJSON(socket, { type: "init", clientId });
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);

            /**
             * Formato atteso del messaggio:
             * {
             *   type: "offer" | "answer" | "ice-candidate",
             *   to: string,        // ID del destinatario (oppure "sessionId" se hai un'altra logica)
             *   data: unknown      // Contenuto dell'offer/answer/candidate
             * }
             */
            const { type, to, data } = message;
            if (!type || !to || !data) {
                console.log("Messaggio con formato non valido:", message);
                return;
            }

            // Troviamo il socket del destinatario
            const targetSocket = clients.get(to);
            if (!targetSocket) {
                console.log(`Destinatario non trovato: ${to}`);
                return;
            }

            // Inoltriamo il messaggio al destinatario, aggiungendo il campo "from"
            sendJSON(targetSocket, {
                type,
                from: clientId,
                data,
            });
        } catch (err) {
            console.error("Errore nel parsing del messaggio:", err);
        }
    };

    socket.onerror = (err) => {
        console.error(`Errore sul socket del client ${clientId}:`, err);
    };

    socket.onclose = () => {
        console.log(`Socket chiuso per il client ${clientId}`);
        clients.delete(clientId);
    };

    return response;
});
