const Influx = require('influx');
const mqtt = require('mqtt');
const os = require('os');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'iiot-practice',
  schema: [
    {
      measurement: 'test',
      fields: {
        value: Influx.FieldType.FLOAT,
      },
      tags: ['host'],
    },
  ],
});

influx
  .getDatabaseNames()
  .then(names => {
    if (!names.includes('iiot-practice')) {
      return influx.createDatabase('iiot-practice');
    }
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => console.log('Error creating database'));

const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  client.subscribe('test', () => console.log('Subscribing to topic `test`'));
});

client.on('message', (topic, message) => {
  let value = parseFloat(message);
  const date = new Date();
  influx
    .writePoints([
      {
        measurement: 'test',
        tags: { host: os.hostname() },
        fields: { value },
      },
    ])
    .then(() => console.log(date.toISOString(), 'Saving to database:', value))
    .catch(err => console.error(`Error saving to database. ${err.stack}`));
});
