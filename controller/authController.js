
const signup_get = (req, res) =>{
    res.send('signup page')
}
const login_get = (req, res) =>{
    res.send('login page')
}
const signup_post = (req, res) =>{
    const {email, username} = req.body
    res.send(`${username} with email:${email} has signed up`)
}
const login_post = (req, res) =>{
    const {email, username} = req.body
    res.send(`${username} with email:${email} has logged in`)
}

module.exports = { signup_get, signup_post, login_get, login_post}