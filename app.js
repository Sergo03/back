const express = require('express');
const logger = require('morgan')
const cors = require('cors');
const path = require('path')
const fs = require('fs').promises
const multer = require('multer')
const uploadDir = path.join(process.cwd(), 'uploads')
const storeImage = path.join(process.cwd(), 'images')
require('dotenv').config();
const superHeroRouter = require('./api/superhero')


const app = express();
//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadDir)
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname)
//     },
//     limits: {
//       fileSize: 1048576,
//     },
//   })
  
//   const upload = multer({
//     storage: storage,
//   })

// app.post('/api/superhero/upload', upload.single('picture'), async (req, res, next) => {
//     // console.log(req.body)
//     // const { description } = req.body
//     const { path: temporaryName, originalname } = req.file
//     const fileName = path.join(storeImage, originalname)
//     try {
//       await fs.rename(temporaryName, fileName)
//     } catch (err) {
//       await fs.unlink(temporaryName)
//       return next(err)
//     }
//     res.json({ message: 'Файл успешно загружен', status: 200 })
//   })
  //

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
  
module.exports=app
  