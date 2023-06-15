import supertest from "supertest";
import { server } from "../index";
import { User } from "@/resource/user/user.model";
import { Todo } from "@/resource/todo/todo.model";
import mongoose from "mongoose";

afterAll(async () => {
	await User.deleteMany();
	await Todo.deleteMany();
	mongoose.connection.close();
	server.close();
});

const request = supertest(server.server);

export { request };
