import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import dotenv from "dotenv";
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorHandler';


const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use(errorHandler)

export default app;
