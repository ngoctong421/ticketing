import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from 'tickets-common';
import { z } from 'zod';

const router = express.Router();

const paymentSchema = z.object({
  token: z.string().nonempty(),
  orderId: z.string().nonempty(),
});

router.post(
  '/api/payments',
  requireAuth,
  validateRequest(paymentSchema),
  async (req: Request, res: Response) => {
    res.send({ success: true });
  }
);

export { router as createChargeRouter };
