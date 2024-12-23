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
exports.deleteItem = exports.updateItem = exports.getItem = exports.createItem = void 0;
const Todo_1 = require("../models/Todo");
const createItem = (userId, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield Todo_1.Todo.create({ userId, title, description });
    return { type: "Success", statusCode: 201, message: "Todo created successfully.", data: newTodo };
});
exports.createItem = createItem;
const getItem = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo_1.Todo.find({ userId });
    return { type: "Success", statusCode: 200, message: "Todos fetched successfully.", data: todos };
});
exports.getItem = getItem;
const updateItem = (todoId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield Todo_1.Todo.findByIdAndUpdate(todoId, updates, { new: true });
    return { type: "Success", statusCode: 200, message: "Todo updated successfully.", data: updatedTodo };
});
exports.updateItem = updateItem;
const deleteItem = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Todo_1.Todo.findByIdAndDelete(todoId);
    return { type: "Success", statusCode: 200, message: "Todo deleted successfully." };
});
exports.deleteItem = deleteItem;
