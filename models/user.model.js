const mongoose = require('mongoose');
const Joi = require('joi');
const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
})

function ValidateUser(user) {
    console.log('hiting');
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required(),
    }
    return Joi.validate(user, schema)
}

exports.validate = ValidateUser;
exports.User = mongoose.model('User',User);
