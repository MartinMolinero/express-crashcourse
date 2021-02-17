const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const videoRoutes = require('./src/routes/videosRoutes')
const favoriteRoutes = require('./src/routes/favoritesRoutes')

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
app.use('/favorites', favoriteRoutes)
app.get('/', (req, res) => {
  res.send('we are home')
})

module.exports = app

// Listen
// app.listen(3000)