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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
let mongod;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'secret';
    mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongod.getUri();
    yield mongoose_1.default.connect(uri);
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongod.stop();
    yield mongoose_1.default.connection.close();
}));
global.signin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'test@test.io';
    const password = '1234';
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    if (!cookie) {
        throw new Error('Cookie not set after signup');
    }
    return cookie;
});
