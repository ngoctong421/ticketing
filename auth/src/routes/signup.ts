import express, { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

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
        res.status(400).json({
          message: 'Invalid request',
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };

router.post(
  '/api/users/signup',
  validateRequestBody(userSchema),
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    console.log('Creating a user...');

    res.send({});
  }
);

export { router as signupRouter };
