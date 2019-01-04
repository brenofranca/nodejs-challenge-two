const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('index', { title: 'NodeJS' }))

router.get('/signup', (req, res) => res.render('auth/signup'))

module.exports = router
