import { request } from "@/config/test.config";

describe("User controllers", () => {
	describe("For Signup", () => {
		describe("Given: Proper user credentials are provided, it", () => {
			const userData = {
				username: "prtk.sd02",
				email: "prtk02@gmail.com",
				password: "lolm01",
			};
			it("should provide `201` status code with user data.", async () => {
				const response = await request
					.post("/api/user/signup")
					.send(userData);
				expect(response.statusCode).toBe(201);
				expect(response.body.data).toHaveProperty("_id");
				expect(response.body.success).toBe(true);
				expect(response.headers["content-type"]).toMatch(/json/);
			});
		});
		describe("Given: insufficient user information is provided, it", () => {
			const userData = {
				username: "prtksd",
			};
			it("should return status code of 400.", async () => {
				const response = await request
					.post("/api/user/signup")
					.send(userData);
				expect(response.statusCode).toBe(400);
			});
			it("should not return any sort of auth token.", async () => {
				const response = await request
					.post("/api/user/signup")
					.send(userData);
				expect(response.body.token).toBeUndefined();
			});
			it("should return success property set to `false`", async () => {
				const response = await request
					.post("/api/user/signup")
					.send(userData);
				expect(response.body.success).toBe(false);
			});
		});
	});
	describe("For Login", () => {
		describe("Given: valid username and password are provided, it", () => {
			const userData = {
				username: "prtk.sd02",
				password: "lolm01",
			};
			it("should return status code of 200", async () => {
				const response = await request
					.post("/api/user/login")
					.send(userData);
				expect(response.statusCode).toBe(200);
			});
			it("should return user id", async () => {
				const response = await request
					.post("/api/user/login")
					.send(userData);
				expect(response.body.data._id).toBeDefined();
			});
			it("it should return success property set to `true`", async () => {
				const response = await request
					.post("/api/user/login")
					.send(userData);
				expect(response.body.success).toBe(true);
			});
			it("it should have `content-type` header set to `application/json`", async () => {
				const response = await request
					.post("/api/user/login")
					.send(userData);
				expect(response.headers["content-type"]).toMatch(/json/);
			});
		});
		describe("Given: Username is not provided, it", () => {
			const dataWithNoUsername = {
				password: "lolm01",
			};
			it("should have status code of 400", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithNoUsername);
				expect(response.statusCode).toBe(400);
			});
			it("should have success property set to `false`", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithNoUsername);
				expect(response.body.success).toBe(false);
			});
		});
		describe("Given: Password is not provided, it", () => {
			const dataWithNoPassword = {
				username: "prtk.sd",
			};
			it("should have status code of 400", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithNoPassword);
				expect(response.statusCode).toBe(400);
			});
			it("should have success property set to `false`", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithNoPassword);
				expect(response.body.success).toBe(false);
			});
		});
		describe("Given: Username provided is non-existent, it", () => {
			const dataWithNonExistentUsername = {
				username: "pratik",
				password: "lolm01",
			};
			it("should return status code `404`", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithNonExistentUsername);
				expect(response.statusCode).toBe(404);
			});
		});
		describe("Given: Password is incorrect, it", () => {
			const dataWithIncorrectPassword = {
				username: "prtk.sd02",
				password: "lolm00",
			};
			it("should return status code of 401", async () => {
				const response = await request
					.post("/api/user/login")
					.send(dataWithIncorrectPassword);
				expect(response.statusCode).toBe(401);
			});
			// it("should return `success` property set to `false`", async () => {
			// 	const response = await request
			// 		.post("/api/user/login")
			// 		.send(dataWithIncorrectPassword);
			// 	expect(response.body.success).toBe(false);
			// });
		});
	});
});
