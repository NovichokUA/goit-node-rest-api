import Joi from "joi";

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Missing required field : email" }),
  password: Joi.string().min(4).required(),
  subscription: Joi.string().min(3),
});

export const userEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Missing required field : email" }),
});
