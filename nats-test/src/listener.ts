import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'listener', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subcription = stan.subscribe('ticket:created');

  subcription.on('message', (msg) => {
    console.log('Message received');
  });
});
