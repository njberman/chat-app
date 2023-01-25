const express = require('express');
const WebSocket = require('ws');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6969;
const URI = process.env.URI;

const ws = new WebSocket.Server({ noServer: true });
ws;

ws.on('connection', (socket) => {
  console.log('New connection!');
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Echoing: ${message}`);
  });
});

const server = app.listen(PORT, () =>
  console.log(
    `Listening on http://localhost:${PORT} and ws://localhost:${PORT}`,
  ),
);
server.on('upgrade', (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, (socket) => {
    ws.emit('connection', socket, request);
  });
});
