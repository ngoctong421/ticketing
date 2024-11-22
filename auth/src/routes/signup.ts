import express, { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { User } from '../models/user';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
        return next(new RequestValidationError(error));
      }

      next(error);
    }
  };

router.post(
  '/api/users/signup',
  validateRequestBody(userSchema),
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Email already in use' }],
      });

      return;
    }

    const user = User.build({ email, password });

    res.status(201).send(user);
  }
);

export { router as signupRouter };
