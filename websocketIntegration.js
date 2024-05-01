const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log('Message Received');
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

const server = http.createServer(app);
setupWebSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
