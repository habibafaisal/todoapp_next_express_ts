import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { createItem, deleteItem, getItem, updateItem } from "../services/todo.service";

export const createTodo = expressAsyncHandler(async (req: Request, res: Response | any) => {
    const { userId, title, description } = req.body;
    const { type, message, statusCode, data } = await createItem(userId, title, description);
    res.status(statusCode).json({ type, code: statusCode, message, data });
});

export const getTodos = expressAsyncHandler(async (req: Request, res: Response | any) => {
    // @ts-ignore
    const userId = req.user.id;
    const { type, message, statusCode, data } = await getItem(userId);
    res.status(statusCode).json({ type, code: statusCode, message, data });
});

export const updateTodo = expressAsyncHandler(async (req: Request, res: Response | any) => {
    const todoId = req.params.id;
    const { title, description, completed } = req.body;
    const { type, message, statusCode, data } = await updateItem(todoId, { title, description, completed });
    res.status(statusCode).json({ type, code: statusCode, message, data });
});

export const deleteTodo = expressAsyncHandler(async (req: Request, res: Response | any) => {
    const todoId = req.params.id;
    const { type, message, statusCode } = await deleteItem(todoId);
    res.status(statusCode).json({ type, code: statusCode, message });
});
