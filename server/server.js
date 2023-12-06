const express = require('express')
const mongoose = require('mongoose')
const { mongo_URI } = require('./config/dev.js')
const authRoutes = require('./routes/authRoutes.js')
const errorHandler = require('./middleware/errorHandlerMiddleware.js')
const quoteRoutes = require('./routes/quoteRoutes.js')
const emailRoutes = require('./routes/emailRoutes.js')
const cors = require('cors')
require('dotenv').config()

// Initialize express
const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
  origin: 'https://inspiroverse.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(errorHandler)

// Connect to MongoDB
mongoose.connect(mongo_URI)
  .then(() => {
    console.log("Connected to mongodb")
  })
  .catch((err) => {
    console.log("Error connecting to db", err)
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/quote', quoteRoutes)
app.use('/api/email', emailRoutes)

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error connecting to the server")
  }
  console.log(`Connected to port ${PORT}`)
})

