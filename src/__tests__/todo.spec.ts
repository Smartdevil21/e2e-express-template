import { request } from "@/config/test.config";

describe("GET /", () => {
	it("Should respond with status `200` and success property set to `true`", async () => {
		const response = await request.get("/");
		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
	});
});

describe("Create Todos:", () => {
	describe("Given: valid input information,it", () => {
		const validTodo = {
			uid: "648c2949bfbf3632231a08fb",
			title: "Some Task",
			desc: "Some description",
			completed: false,
			deadline: "2023-05-22T00:00:00.000Z",
		};
		it("should return status code of 201 with valid response object", async () => {
			const response = await request.post("/api/todo").send(validTodo);
			expect(response.statusCode).toBe(201);
			expect(response.body.success).toBe(true);
			expect(response.body.data._id).toBeDefined();
			// expect(response.body.data).toMatchObject(validTodo);
		});
	});
	describe("Given: insufficient information,it ", () => {
		const invalidTodo = {
			title: "Some Task",
			desc: "Some description",
		};
		it("should return status code of 400 with success property set to `false`", async () => {
			const response = await request.post("/api/todo").send(invalidTodo);
			expect(response.statusCode).toBe(400);
			expect(response.body.success).toBe(false);
		});
	});
});

// describe("Update todo:", () => {
// 	describe("Given: valid update information", () => {
// 		const validUpdateTodo = {
// 			uid: "648c2949bfbf3632231a08fb",
// 			completed: true,
// 		};
// 		it("should return status code of 200 with valid response object", async () => {
// 			const response = await request
// 				.patch("/api/todo")
// 				.send(validUpdateTodo);
// 			expect(response.statusCode).toBe(201);
// 			expect(response.body.success).toBe(true);
// 			expect(response.body.data._id).toBeDefined();
// 			expect(response.body.data).toMatchObject(validUpdateTodo);
// 		});
// 	});
// });
