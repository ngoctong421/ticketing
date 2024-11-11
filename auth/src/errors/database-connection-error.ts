export class DatabaseConnectionError extends Error {
  public reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
