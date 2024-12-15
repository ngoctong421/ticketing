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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const current_user_1 = require("./routes/current-user");
const signin_1 = require("./routes/signin");
const signout_1 = require("./routes/signout");
const signup_1 = require("./routes/signup");
const error_handler_1 = require("./middlewares/error-handler");
const not_found_error_1 = require("./errors/not-found-error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true || process.env.NODE_ENV === 'production',
        maxAge: 3600000,
    },
}));
app.use(current_user_1.currentUserRouter);
app.use(signin_1.signinRouter);
app.use(signout_1.signoutRouter);
app.use(signup_1.signupRouter);
app.all('*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(new not_found_error_1.NotFoundError());
}));
app.use(error_handler_1.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to database');
    }
    catch (err) {
        console.log(err);
    }
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield start();
    console.log('Listening on port 3000');
}));
