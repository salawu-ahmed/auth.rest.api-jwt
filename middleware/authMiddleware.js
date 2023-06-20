require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const requireAuth = (req, res, next) => {
    const token = req.cookie.jwt_token

    if(token){
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('../login/')
            }else{
                next()
            }
        })
    }

    res.redirect('./login')
}

module.exports = { requireAuth }