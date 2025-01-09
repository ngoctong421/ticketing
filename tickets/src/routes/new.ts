import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, BadRequestError } from 'tickets-common';
import { z } from 'zod';

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
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
