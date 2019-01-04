const express = require('express')
const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

const router = express.Router()

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

router.get('/', SessionController.create)

router.get('/signup', UserController.create)
router.post('/signup', upload.single('avatar'), UserController.store)

router.post('/signin', SessionController.store)

router.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = router
