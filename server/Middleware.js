const crypto = require('crypto');

const hashPass = (password) => {
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = class Middleware{
    static transformRequest(req, res, next) {
        if(req.body.username !== undefined){
            req.body.username = req.body.username.toLowerCase();
        }
        if(req.body.password !== undefined){
            req.body.password = hashPass(req.body.password);
        }
        return next();
    }
}