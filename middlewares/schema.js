const Joi = require('joi');
const { subscriptionList } = require('../models/user');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;


const AddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    phone: Joi.string().pattern(phoneRegex).required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(7).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(7).required(),
});

const changeSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    changeSubscriptionSchema,
    emailSchema
};

module.exports = {
    AddSchema,
    updateFavoriteSchema,
    schemas,
    emailRegex,
};