import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        type: "error",
        code: err.status || 500,
        message: err.message || "Internal Server Error",
    });
};
