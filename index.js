const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()
// DATABASE CONNECTION
DB_URI = process.env.DB_URI
db = mongoose.connection
mongoose.connect(DB_URI, {useNewUrlParser: true})
db.once('open', () => console.log('connected to db'))
db.on('error', (err) => console.log(err))

// MIDDLE WARES
app.use(cors())
app.use(bodyParser.json())

PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`server is running on port ${PORT}`))