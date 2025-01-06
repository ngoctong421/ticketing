import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { validateRequest, BadRequestError } from 'tickets-common';

import { User } from '../models/user';

import { Password } from '../services/password';

const router = express.Router();

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().trim().min(1, { message: 'You must supply a password' }),
});

router.post(
  '/api/users/signin',
  validateRequest(userSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError('Invalid credentials'));
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      return next(new BadRequestError('Invalid credentials'));
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
