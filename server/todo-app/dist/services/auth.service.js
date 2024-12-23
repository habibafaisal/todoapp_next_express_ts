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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const bcryptUtils_1 = require("../utils/bcryptUtils");
const jwtUtils_1 = require("../utils/jwtUtils");
const errorCodes_1 = require("../utils/errorCodes");
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.User.findOne({ email });
    if (existingUser) {
        return { type: "Error", statusCode: errorCodes_1.statusCodes.CONFLICT, message: "User already exists." };
    }
    const hashedPassword = yield (0, bcryptUtils_1.hashPassword)(password);
    const newUser = yield User_1.User.create({ email, password: hashedPassword });
    const token = (0, jwtUtils_1.generateToken)({ id: newUser._id });
    return {
        type: "Success",
        statusCode: errorCodes_1.statusCodes.CREATED,
        message: "User registered successfully.",
        token,
        userId: newUser._id,
    };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ email });
    if (!user || !(yield (0, bcryptUtils_1.comparePassword)(password, user.password))) {
        return { type: "Error", statusCode: errorCodes_1.statusCodes.UNAUTHORIZED, message: "Invalid credentials." };
    }
    const token = (0, jwtUtils_1.generateToken)({ id: user._id });
    return {
        type: "Success",
        statusCode: errorCodes_1.statusCodes.OK,
        message: "Login successful.",
        token,
        userId: user._id,
    };
});
exports.loginUser = loginUser;
