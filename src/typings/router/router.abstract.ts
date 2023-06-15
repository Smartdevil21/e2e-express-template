// import { Router } from "express";

import { Router } from "express";
import { IRouter } from "@/typings/router/router.interface";

abstract class BaseRouter {
	protected path: string;
	public router: Router;

	constructor({ path, router }: IRouter) {
		this.path = path;
		this.router = router;
	}
}

export { BaseRouter };
