import express, { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().trim().min(1, { message: 'You must supply a password' }),
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
  '/api/users/signin',
  validateRequestBody(userSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Hi there!');
  }
);

export { router as signinRouter };
