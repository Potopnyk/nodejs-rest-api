const Joi = require('joi');

const emailRegist = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegist = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

const AddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegist).required(),
    phone: Joi.string().pattern(phoneRegist).required(),
});

module.exports =  AddSchema ;