let t = 0;
let u = 0;

const address = 'mqtt://localhost';
const topic = '/test';

const mqtt = require('mqtt');
const client = mqtt.connect(address);

client.on('connect', () => {
  console.log('Publishing to', address);
  setInterval(() => {
    t++;
    u = 100 * Math.abs(Math.sin(0.1 * t));
    u = u.toFixed(2);

    client.publish(topic, u.toString(), { retain: true });
    console.log('Published message:', u);
  }, 100);
});
