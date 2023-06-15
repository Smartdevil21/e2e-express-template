import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

function validationMiddleware(schema: Joi.Schema): RequestHandler {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const validationOptions = {
				abortEarly: false,
				allowUnkown: true,
				stripUnknown: true,
			};
			const values = await schema.validateAsync(
				req.body,
				validationOptions
			);
			req.body = values;
			next();
		} catch (e: any) {
			const errors: string[] = [];
			e.details.forEach((element: Joi.ValidationErrorItem) => {
				errors.push(element.message);
			});
			res.status(400).json({
				success: false,
				message: errors,
			});
		}
	};
}

export { validationMiddleware };
