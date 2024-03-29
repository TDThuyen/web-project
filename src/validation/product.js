import Joi from "joi";

export const productValidator = Joi.object({
    name: Joi.string().required().min(3).max(255),
    price: Joi.string().required().min(1)
})