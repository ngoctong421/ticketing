import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requireAuth, validateRequest } from 'tickets-common';
import { z } from 'zod';

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
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as createOrderRouter };
