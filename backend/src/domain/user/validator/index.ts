import { celebrate, Joi, Segments } from "celebrate";

export const CreateUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export const AuthenticateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
