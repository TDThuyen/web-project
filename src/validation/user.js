import Joi from "joi";

export const singUpValidator = Joi.object({
    userName: Joi.string().required().min(6).max(255),
    phoneNumber: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.string().required().min(6).max(255)
        .valid(Joi.ref("password"))
})

export const signInValidator = Joi.object({
    userName: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
})