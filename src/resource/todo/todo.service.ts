import { ITodo } from "@/resource/todo/todo.interface";
import { Todo } from "@/resource/todo/todo.model";

class TodoService {
	static async create(data: ITodo): Promise<ITodo> {
		const todo = new Todo(data);
		const result = await todo.save();
		return result;
	}

	static async update(
		data: { _id: string } & Partial<ITodo>
	): Promise<ITodo | null> {
		const updatedTodo = await Todo.findOneAndUpdate(
			{ _id: data._id },
			data,
			{ new: true }
		);
		return updatedTodo;
	}

	static async getUserTask(uid: string): Promise<ITodo[]> {
		const tasks = await Todo.find({ uid });
		return tasks;
	}

	static async delete(_id: string): Promise<ITodo | null> {
		const result = await Todo.findByIdAndDelete(_id, { new: true });
		return result;
	}
}

export { TodoService };
