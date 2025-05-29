import { celebrate, Joi, Segments } from "celebrate";

export const CreateReviewValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    productId: Joi.string().required(),
    author: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }),
});

export const UpdateReviewValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    author: Joi.string(),
    rating: Joi.number().min(1).max(5),
    comment: Joi.string(),
  }),
});

export const DeleteReviewValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

export const ListReviewsValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    productId: Joi.string().required(),
  }),
});
