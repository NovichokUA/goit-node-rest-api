import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required field : name" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required field : email" }),
  password: Joi.string().min(4).required(),
  subscription: Joi.string().min(3),
});
