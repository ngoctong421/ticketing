import express, { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

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
        throw new RequestValidationError(error);
      }

      next(error);
    }
  };

router.post(
  '/api/users/signup',
  validateRequestBody(userSchema),
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
