require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/Users')
const secret = process.env.JWT_SECRET
const maxAge = 3 * 24 * 60 * 60 // in secods


const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email:'', password:''}

    //duplicate key error 
    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors
    }
    // validaion errors 
    if(err.message.includes('user validation failed')){
        // console.log(Object.values(err.errors));  returns an array
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    })
}

const signup_get = (req, res) =>{
    res.render('pages/signup.ejs')
}
const login_get = (req, res) =>{
    res.render('pages/login.ejs')
}
const signup_post = async (req, res) =>{
    const {email, password} = req.body
    try{
        const newUser = await User.create({ email, password })
        const token = createToken(newUser._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: newUser._id})
    }
    catch(err){
        const errors = handleError(err)
        res.status(401).json({errors})
    }
}
const login_post = (req, res) =>{
    const {email, password} = req.body
    res.send(`${password} with email:${email} has logged in`)
}

module.exports = { signup_get, signup_post, login_get, login_post}