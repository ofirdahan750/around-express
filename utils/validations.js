const { Segments } = require('celebrate');
const validator = require('validator');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const isUrlVaild = (value, helpers) => {
  return validator.isURL(value) ? value : helpers.error('string.uri');
};

const validatedCreateOrLoginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().max(42).required().email({ minDomainSegments: 2 }),

    password: Joi.string().required().min(8).max(32).required(),

    name: Joi.string().min(2).max(30),

    about: Joi.string().min(2).max(30),

    avatar: Joi.string().custom(isUrlVaild),
  }),
};

const validatedGetSpecifiedUserSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
};

const validatedUpdateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const validatedUpdateAvatarUserSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().custom(isUrlVaild),
  }),
};

const validatedCreateCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2).required(),

    link: Joi.string().custom(isUrlVaild),

    owner: Joi.objectId().required(),

    likes: Joi.array(),
  }),
};

const validatedDeleteCardSchema = {
  body: Joi.object().keys({
    owner: Joi.objectId().required(),
  }),
};

const validateLikeOrDislikeCard = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
};

module.exports = {
  validatedCreateOrLoginUserSchema,
  validatedGetSpecifiedUserSchema,
  validatedUpdateUserSchema,
  validatedUpdateAvatarUserSchema,
  validatedCreateCardSchema,
  validatedDeleteCardSchema,
  validateLikeOrDislikeCard,
};