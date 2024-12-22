import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        const decoded = jwt.verify(token, secretKey) as { id: string };
        // Fetch the user from the database
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            res.status(404).json({
                type: "error",
                code: 404,
                message: "User not found",
            });
            return;
        }

        // req.user = user;
        req.user = <any>user;
        next();
    } catch (error) {
        res.status(401).json({
            type: "error",
            code: 401,
            message: "Invalid or expired token",
        });
    }
};
