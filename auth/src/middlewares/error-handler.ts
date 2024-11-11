import { Request, Response, NextFunction } from 'express';
import { ZodIssue } from 'zod';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((e: ZodIssue) => ({
      message: e.message,
      field: e.path[0],
    }));

    res.status(400).send({
      errors: formattedErrors,
    });
  } else if (err instanceof DatabaseConnectionError) {
    res.status(500).send({
      errors: [{ message: err.reason }],
    });
  } else {
    res.status(400).send({
      errors: [{ message: 'Something went wrong' }],
    });
  }
};
