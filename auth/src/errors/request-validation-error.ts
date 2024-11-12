import { ZodError, ZodIssue } from 'zod';

import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  errors: ZodIssue[];

  constructor(public error: ZodError) {
    super('Invalid request parameters');

    this.errors = error.errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e: ZodIssue) => ({
      message: e.message,
      field: typeof e.path[0] === 'string' ? e.path[0] : undefined,
    }));
  }
}
