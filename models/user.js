const { Schema, model } = require('mongoose'); 
const { handleMongooseError } = require('../helpers');
const { emailRegex } = require('../middlewares/schema');

const subscriptionList = ['starter', 'pro', 'business'];


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            match: emailRegex,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            minlength: 7,
            required: [true, 'Set password for user'],
        },

        subscription: {
            type: String,
            enum: subscriptionList,
            default: 'starter',
        },
        token: {
            type: String,
            default: '',
        },
    },
    { versionKey: false },
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = {
    User,
    subscriptionList,
};