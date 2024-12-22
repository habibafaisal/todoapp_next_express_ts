import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import mongoose from "mongoose";

const secretKey = process.env.JWT_SECRET || "proparadigm";

interface TokenPayload {
    id: mongoose.Types.ObjectId;
}


export const generateToken = (payload: TokenPayload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
// export const generateToken = (payload: IUser) => {
//     return jwt.sign(payload, secretKey, { expiresIn: "1h" });
// };

// This should return the decoded token as IUser
export const validateToken = (token: string): IUser => {
    return jwt.verify(token, secretKey) as IUser; // Make sure it returns IUser
};
