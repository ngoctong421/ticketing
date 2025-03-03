import mongoose from 'mongoose';
import { OrderCancelledEvent, OrderStatus } from 'tickets-common';
import { Message } from 'node-nats-streaming';

import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const data: OrderCancelledEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
});
