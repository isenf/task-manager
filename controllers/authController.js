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