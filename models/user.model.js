const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
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
    isAdmin: Boolean
})

User.statics.generateAuthToken = function (email) { // static methods doesn't require instance
    const token = jwt.sign({
        email: email
    }, 'jwtPrivateKey');
    return token;
}
User.methods.generateAuthToken = function (email, isAdmin) { // methods require instance
    const token = jwt.sign({
        email: email,
        isAdmin: isAdmin
    }, 'jwtPrivateKey');
    return token;
}

function ValidateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required(),
    }
    return Joi.validate(user, schema)
}

exports.validate = ValidateUser;
exports.User = mongoose.model('User', User);