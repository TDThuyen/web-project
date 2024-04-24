import Joi from "joi";

export const singUpValidator = Joi.object({
    fullname: Joi.string().required(),
    birthday: Joi.required(),
    userName: Joi.string().required().min(6).max(255),
    phoneNumber: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.string().required().min(6).max(255)
        .valid(Joi.ref("password")),
    submit: Joi.string(),
    email: Joi.string().email(),
    role: Joi.number()
})

export const signInValidator = Joi.object({
    userName: Joi.string().required().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
    submit: Joi.string(),
    role: Joi.number()
})