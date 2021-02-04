const address = 'localhost';
const port = 8883;
const broker_ws = `ws:${address}:${port}`;

const overlay = document.getElementById('overlay');
const value = document.getElementById('value');

const client = mqtt.connect(broker_ws);

client.on('connect', () => {
  console.log('Client connected to:', broker_ws);
  client.subscribe('/test');
});

client.on('message', (topic, message) => {
  console.log(`Received from ${topic}: ${message}`);

  let val = message + '%'

  overlay.style.height = val;
  value.innerHTML = val;
});
