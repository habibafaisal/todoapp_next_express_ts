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
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const todo_service_1 = require("../services/todo.service");
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, description } = req.body;
    const { type, message, statusCode, data } = yield (0, todo_service_1.createItem)(userId, title, description);
    res.status(statusCode).json({ type, code: statusCode, message, data });
}));
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const { type, message, statusCode, data } = yield (0, todo_service_1.getItem)(userId);
    res.status(statusCode).json({ type, code: statusCode, message, data });
}));
exports.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const { title, description, completed } = req.body;
    const { type, message, statusCode, data } = yield (0, todo_service_1.updateItem)(todoId, { title, description, completed });
    res.status(statusCode).json({ type, code: statusCode, message, data });
}));
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const { type, message, statusCode } = yield (0, todo_service_1.deleteItem)(todoId);
    res.status(statusCode).json({ type, code: statusCode, message });
}));
