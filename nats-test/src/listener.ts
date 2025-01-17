import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subcription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group'
  );

  subcription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Receive event #${msg.getSequence()}, with data ${data}`);
    }
  });
});
