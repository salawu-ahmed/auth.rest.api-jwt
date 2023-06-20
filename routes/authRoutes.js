const express = require('express');
const router = express.Router()
const { 
    get_home, 
    signup_get, 
    signup_post, 
    login_get, 
    login_post, 
    logout,
    get_protected 
} = require('../controller/authController')

const { requireAuth } = require('../middleware/authMiddleware')

router.get('/home', get_home)
router.get('/protected', requireAuth, get_protected)
router.get('/signup', signup_get)
router.post('/signup', signup_post)
router.get('/login', login_get)
router.post('/login', login_post)
router.get('/login', logout)

module.exports = router;