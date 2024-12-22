import { Todo } from "../models/Todo";

export const createItem = async (userId: string, title: string, description: string) => {
    const newTodo = await Todo.create({ userId, title, description });
    return { type: "Success", statusCode: 201, message: "Todo created successfully.", data: newTodo };
}
export const getItem = async (userId: string) => {
    const todos = await Todo.find({ userId });
    return { type: "Success", statusCode: 200, message: "Todos fetched successfully.", data: todos };
}

export const updateItem = async (todoId: string, updates: any) => {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updates, { new: true });
    return { type: "Success", statusCode: 200, message: "Todo updated successfully.", data: updatedTodo };
}

export const deleteItem = async (todoId: string) => {
    await Todo.findByIdAndDelete(todoId);
    return { type: "Success", statusCode: 200, message: "Todo deleted successfully." };
}

