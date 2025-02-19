import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from 'tickets-common';
import { z } from 'zod';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

const orderSchema = z.object({
  ticketId: z
    .string()
    .nonempty({ message: 'TicketId must be provided' })
    .refine((val) => mongoose.Types.ObjectId.isValid(val)),
});

router.post(
  '/api/orders',
  requireAuth,
  validateRequest(orderSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(new NotFoundError());
    }

    // Make sure that this ticket is not already reserved
    const existingOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });
    if (existingOrder) {
      return next(new BadRequestError('Ticket is already reserved'));
    }

    // Calculate an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that an order was created

    res.send({});
  }
);

export { router as createOrderRouter };
