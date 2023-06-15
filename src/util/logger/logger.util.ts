import { createLogger, transports, format } from "winston";
import fs from "fs";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

let dir = process.env.LOG_DIRECTORY;
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
	// Create the directory if it does not exist
	fs.mkdirSync(dir);
}

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn";

const dailyRotateFile = new DailyRotateFile({
	level: logLevel,
	filename: dir + "/%DATE%.log",
	datePattern: "YYYY-MM-DD",
	zippedArchive: true,
	handleExceptions: true,
	maxSize: "20m",
	maxFiles: "14d",
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp(),
		format.json()
	),
});

const logger = createLogger({
	transports: [
		new transports.Console({
			level: logLevel,
			format: format.combine(
				format.errors({ stack: true }),
				format.prettyPrint()
			),
		}),
		dailyRotateFile,
	],
	exceptionHandlers: [dailyRotateFile],
	exitOnError: false, // do not exit on handled exceptions
});

// class Logger {
// 	public info(...args: any) {
// 		console.log(`INFO ::::: ${args}`);
// 	}

// 	public error(...args: any) {
// 		console.log(`ERROR ::::: ${args}`);
// 	}
// }

// const logger = new Logger();

export { logger };
