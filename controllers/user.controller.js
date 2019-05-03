const {
    User,
    validate
} = require('../models/user.model');
const HTTP = require('http-status');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        if (user) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: 'user already exists'
            });
        }
        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({
            email: user.email
        }, 'jwtPrivateKey');
        const result = _.pick(user, ['name', 'email']) // it will pick only selected properties
        res.header('x-auth-token', token).status(HTTP.OK).send({
            message: 'User successfully registered',
            user: result
        })
    } catch (e) {
        return next();
    }

}