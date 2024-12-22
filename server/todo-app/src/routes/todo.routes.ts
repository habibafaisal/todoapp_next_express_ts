import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller";
import { validateToken } from "../middlewares/tokenValidation";

const router = express.Router();

router.use(validateToken);

router.post("/create", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
