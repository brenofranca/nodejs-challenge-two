const express = require('express')
const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

const router = express.Router()

const authMiddleware = require('../middlewares/auth')
const guestMiddleware = require('../middlewares/guest')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

router.use((req, res, next) => {
  res.locals.flashError = req.flash('error')
  res.locals.flashSuccess = req.flash('success')

  return next()
})

router.get('/', guestMiddleware, SessionController.create)
router.post('/signin', guestMiddleware, SessionController.store)

router.get('/signup', guestMiddleware, UserController.create)
router.post('/signup', upload.single('avatar'), UserController.store)

router.use('/app', authMiddleware)

router.get('/app/dashboard', (req, res) => res.render('dashboard'))
router.get('/app/signout', SessionController.destroy)

module.exports = router
