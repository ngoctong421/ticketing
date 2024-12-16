"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const request_validation_error_1 = require("../errors/request-validation-error");
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            throw new request_validation_error_1.RequestValidationError(error);
        }
        next(error);
    }
};
exports.validateRequest = validateRequest;
