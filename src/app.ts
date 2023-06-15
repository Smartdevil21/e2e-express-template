import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import { logger } from "./util/logger/logger.util";
import { HttpException } from "./util/httpException/httpException.util";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { IncomingMessage, Server, ServerResponse } from "http";
import { BaseRouter } from "./typings/router/router.abstract";

class App {
	private express: Application;
	private port: number;
	public server:
		| Server<typeof IncomingMessage, typeof ServerResponse>
		| undefined;

	constructor(routers: BaseRouter[]) {
		this.express = express();
		this.port = Number(process.env.PORT) || 8001;

		this.initialiseDBConnection();
		this.initialiseMiddlewares();
		this.initaliseRouters(routers);
		this.initialiseRouteNotFoundHandler();
		this.initialiseErrorHandler();
	}

	private async initialiseDBConnection(): Promise<void> {
		try {
			const DB = process.env.DB;
			if (!DB) throw new Error("DB_URI not found!");
			await mongoose.connect(DB);
		} catch (error: any) {
			logger.error(`Error in connecting to DB: ${error}`);
		}
	}

	private initialiseMiddlewares(): void {
		this.express.use(cors({ origin: "*" }));
		this.express.use(helmet());
		this.express.use(compression());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(morgan("dev"));
	}

	private initaliseRouters(routers: BaseRouter[]): void {
		this.express.get("/", (req: Request, res: Response) => {
			res.status(200).json({
				success: true,
				data: "Hello from the backend",
			});
		});
		routers.forEach((router) => {
			this.express.use("/api", router.router);
		});
	}

	private initialiseRouteNotFoundHandler(): void {
		this.express.use(
			"*",
			(req: Request, res: Response, next: NextFunction) => {
				next(
					new HttpException({
						status: 404,
						message: `The requested route ${req.originalUrl} does not exixts!`,
					})
				);
			}
		);
	}

	private initialiseErrorHandler(): void {
		this.express.use(errorHandler);
	}

	public listen(): void {
		this.server = this.express.listen(this.port, () =>
			logger.info(`Server listening on port ${this.port}`)
		);
	}

	public close(): void {
		this.server?.close();
	}
}

export { App };
