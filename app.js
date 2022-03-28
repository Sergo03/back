const express = require('express');
const logger = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const superHeroRouter = require('./api/superhero')


const app = express();


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors());
app.use(express.json());

app.use('/api/superhero', superHeroRouter)


app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

  
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
  
module.exports=app
  