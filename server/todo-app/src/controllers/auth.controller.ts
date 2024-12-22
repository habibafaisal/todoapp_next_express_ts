import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { loginUser, registerUser } from "../services/auth.service";

export const registerWithEmail = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message, statusCode, token, userId } = await registerUser(email, password);

    res.status(statusCode).json({ type, code: statusCode, message, token, userId });
});

export const loginWithEmail = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message, statusCode, token, userId } = await loginUser(email, password);
    res.status(statusCode).json({ type, code: statusCode, message, token, userId });
});
