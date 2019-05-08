const jwt = require('jsonwebtoken');

function auth(req,res, next) {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send({
            error:' Access denied. no token provided'
        })
    }
   try{
    const decod = jwt.verify(token,'jwtPrivateKey');
    req.user = decod;
    next();
   }catch(e){
        res.status(400).send('invalid token')
   }

}

module.exports = auth;