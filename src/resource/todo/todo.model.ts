import mongoose, { Schema, model } from "mongoose";
import { ITodo } from "@/resource/todo/todo.interface";

const todoSchema = new Schema({
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	desc: String,
	deadline: Date,
	completed: Boolean,
});

const Todo = model<ITodo>("todo", todoSchema);

export { Todo };
