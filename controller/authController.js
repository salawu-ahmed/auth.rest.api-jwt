const User = require('../models/Users')

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
        console.log(err);
        res.status(400).send('error: user not created')
    }
}
const login_post = (req, res) =>{
    const {email, password} = req.body
    res.send(`${password} with email:${email} has logged in`)
}

module.exports = { signup_get, signup_post, login_get, login_post}