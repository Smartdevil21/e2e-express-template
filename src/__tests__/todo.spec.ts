import { request } from "@/config/test.config";

describe("GET /", () => {
	it("Should respond with status `200` and success property set to `true`", async () => {
		const response = await request.get("/");
		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
	});
});
