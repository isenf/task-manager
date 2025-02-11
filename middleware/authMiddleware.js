const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, secretKey, async (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/login');
            }
            else{
                req.user = decodedToken.id;
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, secretKey, async (err, decodedToken) =>{
            if(err){
                console.log(err);
                res.locals.user = null;
                req.user = null;
                next();
            }
            else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        req.user = null;
        next();
    }

    console.log(req.user);
}

module.exports = { requireAuth, checkUser };