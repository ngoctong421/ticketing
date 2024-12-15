"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(error) {
        super('Invalid request parameters');
        this.error = error;
        this.statusCode = 400;
        this.errors = error.errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((e) => ({
            message: e.message,
            field: typeof e.path[0] === 'string' ? e.path[0] : undefined,
        }));
    }
}
exports.RequestValidationError = RequestValidationError;
