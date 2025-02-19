import express, { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from 'tickets-common';

import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      return next(new NotFoundError());
    }

    if (order.userId !== req.currentUser!.id) {
      return next(new NotAuthorizedError());
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
