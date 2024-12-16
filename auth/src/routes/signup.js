"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const user_1 = require("../models/user");
const validate_request_1 = require("../middlewares/validate-request");
const bad_request_error_1 = require("../errors/bad-request-error");
const router = express_1.default.Router();
exports.signupRouter = router;
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z
        .string()
        .min(4, { message: 'Must be 4 or more characters long' })
        .max(20, { message: 'Must be 20 or fewer characters long' }),
});
router.post('/api/users/signup', (0, validate_request_1.validateRequest)(userSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        return next(new bad_request_error_1.BadRequestError('Email in use'));
    }
    const user = user_1.User.build({ email, password });
    yield user.save();
    // Generate JWT
    const userJwt = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_KEY);
    // Store it on session object
    req.session.jwt = userJwt;
    res.status(201).send(user);
}));
