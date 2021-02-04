const aedes = require('aedes')();
const broker = require('net').createServer(aedes.handle);
const port = 1883;

broker.listen(port, () => {
  console.log('MQTT broker listening on port', port);
})

const http_server = require('http').createServer();
const ws = require('websocket-stream');
const ws_port = 8883;

ws.createServer({ server: http_server }, aedes.handle);

http_server.listen(ws_port, () => {
  console.log('Aedes MQTT-over-WebSocket broker listening on port', ws_port);
});
