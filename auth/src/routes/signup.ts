import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z, ZodError } from 'zod';

import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(4, { message: 'Must be 4 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
});

const validateRequestBody =
  (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RequestValidationError(error);
      }

      next(error);
    }
  };

router.post(
  '/api/users/signup',
  validateRequestBody(userSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError('Email in use'));
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({ id: user.id, email: user.email }, 'secret');

    // Store it on session object
    req.session.jwt = userJwt;

    res.status(201).send(user);
  }
);

export { router as signupRouter };
