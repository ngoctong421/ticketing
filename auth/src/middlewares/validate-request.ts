import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest =
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
