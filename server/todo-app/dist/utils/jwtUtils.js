"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "proparadigm";
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
// export const generateToken = (payload: IUser) => {
//     return jwt.sign(payload, secretKey, { expiresIn: "1h" });
// };
// This should return the decoded token as IUser
const validateToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secretKey); // Make sure it returns IUser
};
exports.validateToken = validateToken;
