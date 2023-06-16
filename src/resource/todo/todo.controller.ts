import { Request, Response, NextFunction } from "express";
import { TodoService } from "@/resource/todo/todo.service";
import { logger } from "@/util/logger/logger.util";
import { HttpException } from "@/util/httpException/httpException.util";

class TodoController {
	public async getTodo(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await TodoService.getUserTask(req.params.uid);
			res.status(200).json({
				success: true,
				data: result,
			});
		} catch (error: any) {
			logger.error(`Err in getting user todos: ${error}`);
			next(
				new HttpException({
					status: 400,
					message: `Err in getting user todos: ${error}`,
				})
			);
		}
	}

	public async createTodo(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await TodoService.create(req.body);
			res.status(201).json({
				success: true,
				data: result,
			});
		} catch (error: any) {
			logger.error(`Err in creating todo: ${error}`);
			next(
				new HttpException({
					status: 400,
					message: `Err in creating todo: ${error}`,
				})
			);
		}
	}

	public async updateTodo(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await TodoService.update(req.body);
			res.status(200).json({
				success: true,
				data: result,
			});
		} catch (error: any) {
			logger.error(`Err in updating todo: ${error}`);
			next(
				new HttpException({
					status: 400,
					message: `Err in updating todo: ${error}`,
				})
			);
		}
	}

	public async deleteTodo(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const result = await TodoService.delete(req.params._id);
			res.status(204).json({
				success: true,
				data: result,
			});
		} catch (error: any) {
			logger.error(`Err in deleting todo: ${error}`);
			next(
				new HttpException({
					status: 400,
					message: `Err in deleting todo: ${error}`,
				})
			);
		}
	}
}

export { TodoController };
