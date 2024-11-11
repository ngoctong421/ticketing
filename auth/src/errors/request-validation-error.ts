import { ZodError } from 'zod';

export class RequestValidationError extends Error {
  public errors: ZodError['errors'];

  constructor(public error: ZodError) {
    super();

    this.errors = error.errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
