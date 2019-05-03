const {
    User
} = require('../models/user.model');
const HTTP = require('http-status');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config= require('config');

exports.createUser = async (req, res, next) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(HTTP.BAD_REQUEST).send({
        error: error.details[0].message
    });
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: 'Invalid email or password'
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: 'Invalid email or password'
            });
        }
        const token = User.generateAuthToken();
        // console.log("*****************",token);
        res.status(HTTP.OK).send({
            message: 'login successfull',
            token: token
        })
    } catch (e) {
        return next();
    }

}

function validate(user) {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required(),
    }
    return Joi.validate(user, schema)
}