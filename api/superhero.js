const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const SuperHero = require('../model/index')


const path = require('path')
const fs = require('fs').promises
const multer = require('multer')
const uploadDir = path.join(process.cwd(), 'uploads')
const storeImage = path.join(process.cwd(), 'images')


router.get('/', async (req, res, next) => {
  try {
    const superheroes = await SuperHero.listHeros()
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { superheroes }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:heroId', async (req, res, next) => {
  try {
    const id = req.params.heroId;
    const selectHero = await SuperHero.getHeroById(id);
    if (!selectHero) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: "Not found"
      })
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { selectHero }
    })
  } catch (error) {
    next(error)
  }
})



router.post('/', async (req, res, next) => {
  // console.log(req.body)
  try {

    const addHero = await SuperHero.addHero(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { addHero }
    })
  } catch (error) {
    next(error)
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1048576,
  },
})

const upload = multer({
  storage: storage,
})

router.post('/upload', upload.single('picture'), async (req, res, next) => {
  // const { description } = req.body
  const { path: temporaryName, originalname } = req.file
  const fileName = path.join(storeImage, originalname)
  try {
    const img = path.join('images', originalname);
    await fs.rename(temporaryName, fileName)

    const buffer = await fs.readFile(img);

    const postImg = async () => {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: { 'Authorization': 'Client-ID efc075cee4fa5c1' },
        body: buffer
      }
      );
      const data = await response.json();
      // console.log(data.data.link)
      return data.data.link
    }
   
    const urlImg = await postImg()
    
    return res.status(200).json({
      status: 200,
      data:urlImg
    })

  } catch (err) {
    await fs.unlink(temporaryName)
    return next(err)
  }

})

router.patch('/:heroId', async (req, res, next) => {
  try {
    const id = req.params.heroId;
    const body = req.body;
    const heros = await SuperHero.updateHero(id, body);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: { heros }
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router