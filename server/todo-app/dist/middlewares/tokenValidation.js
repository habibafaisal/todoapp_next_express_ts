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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
            type: "error",
            code: 401,
            message: "Authorization token is missing",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({
            type: "error",
            code: 401,
            message: "Token is missing",
        });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET || "proparadigm";
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Fetch the user from the database
        const user = yield User_1.User.findById(decoded.id).select("-password");
        if (!user) {
            res.status(404).json({
                type: "error",
                code: 404,
                message: "User not found",
            });
            return;
        }
        // req.user = user;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            type: "error",
            code: 401,
            message: "Invalid or expired token",
        });
    }
});
exports.validateToken = validateToken;
