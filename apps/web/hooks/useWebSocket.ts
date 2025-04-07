import { useEffect, useState } from "react";

export type Message = {
    type: string;
    clientId?: string;
    from?: string;
    to?: string;
    data?: any;
};

export const useWebSocket = (
    url: string,
    onMessageHandler?: (message: Message) => void
) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [clientId, setClientId] = useState<string>("");

    useEffect(() => {
        const ws = new WebSocket(url);
        setSocket(ws);

        ws.onopen = () => {
            console.log("Connesso al signaling server");
        };

        ws.onmessage = (event: MessageEvent<string>) => {
            try {
                const message: Message = JSON.parse(event.data);
                // Gestione del messaggio di inizializzazione
                if (message.type === "init" && message.clientId) {
                    setClientId(message.clientId);
                    console.log("Il mio clientId è:", message.clientId);
                }
                // Invoca il gestore per altri messaggi
                if (onMessageHandler) {
                    onMessageHandler(message);
                }
            } catch (err) {
                console.error("Errore nel parsing del messaggio:", err);
            }
        };

        ws.onerror = (err) => {
            console.error("Errore sul WebSocket:", err);
        };

        ws.onclose = () => {
            console.log("WebSocket chiuso");
        };

        // Cleanup alla disconnessione
        return () => {
            ws.close();
        };
    }, [url, onMessageHandler]);

    return { socket, clientId };
};
