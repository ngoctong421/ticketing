import express, { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from 'tickets-common';
import { z } from 'zod';

import { Order } from '../models/order';

const router = express.Router();

const paymentSchema = z.object({
  token: z.string().nonempty(),
  orderId: z.string().nonempty(),
});

router.post(
  '/api/payments',
  requireAuth,
  validateRequest(paymentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      next(new NotFoundError());
    }
    if (order!.userId !== req.currentUser!.id) {
      next(new NotAuthorizedError());
    }
    if (order!.status === OrderStatus.Cancelled) {
      next(new BadRequestError('Cannot pay for an cancelled order'));
    }

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
