const express = require('express')
const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

const router = express.Router()

const authMiddleware = require('../middlewares/auth')
const guestMiddleware = require('../middlewares/guest')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

router.get('/', guestMiddleware, SessionController.create)

router.get('/signup', guestMiddleware, UserController.create)
router.post('/signup', upload.single('avatar'), UserController.store)
router.post('/signin', guestMiddleware, SessionController.store)

router.use('/app', authMiddleware)

router.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = router
