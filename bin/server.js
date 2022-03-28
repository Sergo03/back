// const app = require('../app')

// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

const app = require('../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
// import app from '../app'
// import app from '../app'
// import mongoose from 'mongoose' 
// import dotenv from 'dotenv'
dotenv.config()

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3001

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>app.listen(PORT, () => {
  console.log(`Database connection successful`)
})).catch((error) => {
  console.log(error)
  return process.exit(1)
})