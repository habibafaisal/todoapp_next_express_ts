import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";

export interface ITodo extends Document {
    userId: ObjectId;
    title: string;
    completed: boolean;
}

const todoSchema = new Schema<ITodo>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
