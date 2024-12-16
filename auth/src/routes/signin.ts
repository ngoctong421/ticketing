import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().trim().min(1, { message: 'You must supply a password' }),
});

router.post(
  '/api/users/signin',
  validateRequest(userSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Hi there!');
  }
);

export { router as signinRouter };
