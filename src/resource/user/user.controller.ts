import { Request, Response, NextFunction } from "express";
import { UserService } from "@/resource/user/user.service";
import { logger } from "@/util/logger/logger.util";
import { HttpException } from "@/util/httpException/httpException.util";

class UserController {
	// private userService = new UserService();

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.create(req.body);
			res.status(201).json({
				success: true,
				data: user,
			});
		} catch (error: any) {
			logger.error(`Err in creating user: ${error.message}`);
			next(
				new HttpException({
					status: 400,
					message: error.message,
				})
			);
		}
	}

	public async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UserService.login(req.body);
			res.status(200).json({
				success: true,
				data: user,
			});
		} catch (error: any) {
			logger.error(`Err in login user: ${error.message}`);
			next(error);
		}
	}
}

export { UserController };
