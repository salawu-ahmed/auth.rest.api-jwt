const User = require('../models/Users')

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

const signup_get = (req, res) =>{
    res.send('signup page')
}
const login_get = (req, res) =>{
    res.send('login page')
}
const signup_post = async (req, res) =>{
    const {email, password} = req.body
    try{
        const newUser = await User.create({ email, password })
        res.status(201).json(newUser)
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