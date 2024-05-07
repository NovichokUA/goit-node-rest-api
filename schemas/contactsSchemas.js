import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required field : name" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required field : email" }),
  phone: Joi.number()
    .min(7)
    .required()
    .messages({ "any.required": "Missing required field : number" }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().min(7),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});
