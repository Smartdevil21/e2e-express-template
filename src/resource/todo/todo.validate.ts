import joi from "joi";

const createTodoValidate = joi.object({
	uid: joi.string().required(),
	title: joi.string().required().min(1),
	description: joi.string(),
	deadline: joi.date().required(),
	completed: joi.boolean().required(),
});

const updateTodoValidate = joi.object({
	_id: joi.string().required(),
	title: joi.string(),
	description: joi.string(),
	deadline: joi.date(),
	completed: joi.boolean(),
});

export { createTodoValidate, updateTodoValidate };
