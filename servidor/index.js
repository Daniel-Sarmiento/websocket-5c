const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', ws => {
    console.log("cliente conectado");

    ws.on('close', () => {
        console.log("cliente desconectado");
    });

    ws.on('message', data => {
        console.log("mensaje recibido: %s", data);

        // Broadcast
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const mensaje = JSON.parse(data);

                client.send(JSON.stringify(mensaje));
            }
        });
    });
});