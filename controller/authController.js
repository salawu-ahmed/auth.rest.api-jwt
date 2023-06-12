
const signup_get = (req, res) =>{
    res.send('login page')
}
const login_get = (req, res) =>{
    res.send('login page')
}
const signup_post = (req, res) =>{
    res.send('new signup')
}
const login_post = (req, res) =>{
    res.send('user logged in')
}

module.exports = { signup_get, signup_post, login_get, login_post}