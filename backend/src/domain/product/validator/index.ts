import { celebrate, Joi, Segments } from "celebrate";

export const CreateProductValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
  }),
});

export const UpdateProductValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
    category: Joi.string(),
  }),
});

export const DeleteProductValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});
