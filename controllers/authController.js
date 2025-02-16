const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const handleErrors = (err) =>{
    console.log(err.message, err.code);

    let errors = { email: '', password: '' };

    if(err.message === 'incorrect email'){
        errors.email = 'this email is not registered';
    }

    if(err.message === 'incorrect password'){
        errors.password = 'this password is incorrect';
    }

    if(err.code === 11000){
        errors.email = 'this email is already registered';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) =>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAgeToken = 5 * 24 * 60 * 60; //5 days

const createToken = (id) =>{
    return jwt.sign({ id }, secretKey, {
        expiresIn: maxAgeToken
    });
}

module.exports.register_get = (req, res) =>{
    res.render('auth/register');
}

module.exports.login_get = (req, res) =>{
    res.render('auth/login');
}

module.exports.register_post = async (req, res) =>{
    const {name, email, password} = req.body;

    console.log(name, email, password)

    try{
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeToken * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeToken * 1000 });
        res.status(201).json({user: user._id});
    } 
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({error});
    }
}

module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/'); 
}