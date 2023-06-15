import { IHttpException } from "@/typings/exceptions/httpException.interface";

class HttpException extends Error {
	public status: number;
	public message: string;

	constructor({ message, status }: IHttpException) {
		super(message);
		this.message = message;
		this.status = status;
	}
}

export { HttpException };
