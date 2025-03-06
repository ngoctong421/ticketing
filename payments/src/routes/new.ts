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
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const paymentSchema = z.object({
  orderId: z.string().nonempty(),
});

router.post(
  '/api/payments',
  requireAuth,
  validateRequest(paymentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new NotFoundError());
    }
    if (order.userId !== req.currentUser!.id) {
      return next(new NotAuthorizedError());
    }
    if (order.status === OrderStatus.Cancelled) {
      return next(new BadRequestError('Cannot pay for an cancelled order'));
    }

    const charge = await stripe.paymentIntents.create({
      amount: order.price * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const payment = Payment.build({
      orderId: order.id,
      stripeId: charge.id,
    });
    await payment.save();

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ client_secret: charge.client_secret });
  }
);

export { router as createChargeRouter };
