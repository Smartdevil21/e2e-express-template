import { BaseRouter } from "@/typings/router/router.abstract";
import { Router } from "express";
import { UserController } from "@/resource/user/user.controller";
import { validationMiddleware } from "@/middleware/validator.middleware";
import {
	createUserValidate,
	loginUserValidate,
} from "@/resource/user/user.validate";
// import { IRouter } from "@/typings/router/router.interface";

class UserRouter extends BaseRouter {
	private userController = new UserController();

	constructor() {
		super({ path: "/user", router: Router() });
		// this.router.use(this.path, this.router);
		this.initialiseRoutes();
	}

	public async initialiseRoutes() {
		this.router.post(
			`${this.path}/signup`,
			validationMiddleware(createUserValidate),
			this.userController.createUser
		);

		this.router.post(
			`${this.path}/login`,
			validationMiddleware(loginUserValidate),
			this.userController.loginUser
		);
	}
}

export { UserRouter };
