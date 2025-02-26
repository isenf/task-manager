const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secretKey, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.redirect("/auth/login");
            } else {
                let user = await User.findById(decodedToken.id);
                if (!user) {
                    return res.redirect("/auth/login");
                }
                req.user = user;

                if(req.path === "/login" || req.path === "/register"){
                    return res.redirect("/task");
                }

                next();
            }
        });
    } else {
        return res.redirect("/auth/login");
    }
};

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, secretKey, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                req.user = null;
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.user = user;
            }
            next();
        });
    } else {
        res.locals.user = null;
        req.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };
