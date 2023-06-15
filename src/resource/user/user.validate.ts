import joi from "joi";

const createUserValidate = joi.object({
	username: joi.string().required().min(4),
	email: joi.string().email().required(),
	password: joi.string().min(4).required(),
});

const loginUserValidate = joi.object({
	username: joi.string().required(),
	password: joi.string().required(),
});

export { createUserValidate, loginUserValidate };
