import "dotenv/config";
import "module-alias/register";
import { App } from "./app";
import { validateEnv } from "./util/validateEnv/validateEnv.util";
import { UserRouter } from "./resource/user/user.router";

validateEnv();
export const server = new App([new UserRouter()]);
server.listen();
