const HTTP = require('http-status')


function admin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(HTTP.FORBIDDEN).send({
            message: 'Access deneid'
        });
    }
    next()
}


module.exports = admin