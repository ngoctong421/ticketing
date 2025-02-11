import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from 'tickets-common';
import { z } from 'zod';

import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';

const router = express.Router();

const ticketSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  price: z.number().gt(0, 'Price must be greater than 0'),
});

router.post(
  '/api/tickets',
  requireAuth,
  validateRequest(ticketSchema),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
