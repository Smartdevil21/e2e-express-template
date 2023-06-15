import { Schema, model } from "mongoose";
import { ITodo } from "@/resource/todo/todo.interface";

const todoSchema = new Schema({
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
