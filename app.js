const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const videoRoutes = require('./routes/videosRoutes')

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.2hvwk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

// Connect to Atlas
mongoose.connect(MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('MONGOOSE IS CONNECTED')
})

// Libs
app.use(bodyParser.json());

// Routes
app.use('/videos', videoRoutes)
app.get('/', (req, res) => {
  res.send('we are home')
})

// Listen
app.listen(3000)