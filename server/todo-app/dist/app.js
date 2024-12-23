"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, db_1.default)();
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/todos', todo_routes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
