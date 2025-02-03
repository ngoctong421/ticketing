import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    // get all the events that have been emitted in the past
    .setDeliverAllAvailable()
    // keep track of all the different events that have gone to this subcription or the queue group, even if it goes offline for a litle bit
    .setDurableName('accounting-service');

  const subcription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subcription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Receive event #${msg.getSequence()}, with data ${data}`);
    }

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
