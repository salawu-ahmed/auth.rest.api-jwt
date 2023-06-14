const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.set('view-engine', 'ejs')

// DATABASE CONNECTION
DB_URI = process.env.DB_URI
db = mongoose.connection
mongoose.connect(DB_URI, {useNewUrlParser: true})
db.once('open', () => console.log('connected to db'))
db.on('error', (err) => console.log(err))

// ROUTES
const authRoutes = require('./routes/authRoutes')

// MIDDLE WARES
app.use(express.static(__dirname +'/public'))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', authRoutes)

// LEARNING COOKIES 
app.get('/setCookies', (req, res) => {
    res.setHeader('Set-Cookie', 'name = true')
    res.cookie('lastname', 'shawn')
    // maxAge is in milliseconds
    // httpOnly it cannot be accessed on client side 
    // secure sends the cookie only over https
    // use https connection for production purposes 
    res.cookie('isEmployed', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true })
    res.send('you got the cookies')
})
app.get('/readCookies', (req, res) => {
    const cookies = req.cookies
    res.json(cookies)
})


PORT = process.env.CONNECTION_PORT || 4000
app.listen(PORT, console.log(`server is running on port ${PORT}`))