let t = 0;
let u = 0;
let freq = 0.5;
let amp = 0.5;

const address = 'mqtt://localhost';
const topic = 'test';

const mqtt = require('mqtt');
const client = mqtt.connect(address);

console.log('Connecting to', address);

// Client terhubung ke broker MQTT
client.on('connect', () => {
  console.log('Connected');
  console.log('Publishing to', address);

  // Subscribe ke topic dari masukan HMI
  client.subscribe('range1');
  client.subscribe('range2');

  setInterval(() => {
    t++;
    u = 50 * amp * Math.abs(Math.sin(0.1 * t * freq));
    u += 50;
    u = u.toFixed(2);

    client.publish(topic, u.toString(), { retain: true });
    const date = new Date();
    console.log(date.toISOString(), 'Published message:', u);
  }, 100);
});

// Client menerima pesan MQTT
client.on('message', (topic, message) => {
  let val = parseFloat(message);
  console.log('Received from', topic, val);
  switch (topic) {
    case 'range1':
      freq = val;
      break;
    case 'range2':
      amp = val;
      break;
  }
});
