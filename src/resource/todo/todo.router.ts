import { validationMiddleware } from "@/middleware/validator.middleware";
import { TodoController } from "@/resource/todo/todo.controller";
import { BaseRouter } from "@/typings/router/router.abstract";
import { Router } from "express";
import {
	createTodoValidate,
	updateTodoValidate,
} from "@/resource/todo/todo.validate";

class TodoRouter extends BaseRouter {
	private todoController = new TodoController();

	constructor() {
		super({ path: "/todo", router: Router() });
		this.initialiseRoutes();
	}

	private initialiseRoutes() {
		this.router.get(`${this.path}/:uid`, this.todoController.getTodo);
		this.router.post(
			`${this.path}`,
			validationMiddleware(createTodoValidate),
			this.todoController.createTodo
		);
		this.router.patch(
			`${this.path}`,
			validationMiddleware(updateTodoValidate),
			this.todoController.updateTodo
		);
		this.router.delete(`${this.path}/:_id`, this.todoController.deleteTodo);
	}
}

export { TodoRouter };
