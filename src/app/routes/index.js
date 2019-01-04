const express = require('express')
const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/', (req, res) => res.render('index', { title: 'NodeJS' }))

router.get('/signup', UserController.create)
router.post('/signup', upload.single('avatar'), UserController.store)

module.exports = router
