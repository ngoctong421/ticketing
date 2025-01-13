import express, { NextFunction, Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from 'tickets-common';
import { z } from 'zod';

import { Ticket } from '../models/ticket';

const router = express.Router();

const ticketSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  price: z.number().gt(0, 'Price must be greater than 0'),
});

router.put(
  '/api/tickets/:id',
  requireAuth,
  validateRequest(ticketSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new NotFoundError());
    }

    if (ticket.userId !== req.currentUser?.id) {
      return next(new NotAuthorizedError());
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
