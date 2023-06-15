import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
	// eslint-disable-next-line no-undef
	cleanEnv(process.env, {
		NODE_ENV: str({
			choices: ["development", "production", "testing"],
		}),
		DB: str(),
		PORT: port({
			default: 8001,
		}),
	});
}

export { validateEnv };
