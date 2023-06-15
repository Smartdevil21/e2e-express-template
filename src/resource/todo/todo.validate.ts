import joi from "joi";

const createTodoValidate = joi.object({
	title: joi.string().required().min(1),
	description: joi.string(),
	deadline: joi.date(),
	completed: joi.boolean(),
});

export { createTodoValidate };
