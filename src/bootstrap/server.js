const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const routes = require('../app/routes/index')

class App {
  constructor () {
    this.express = express()

    this.isDEV = process.env.NODE_ENV !== 'production'

    this.middlewares()

    this.views()

    this.routes()

    this.handlers()
  }

  middlewares () {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(express.static(path.join(__dirname, '../', 'public')))
  }

  views () {
    this.express.set(
      'views',
      path.join(__dirname, '../', 'app', 'resources', 'views')
    )

    nunjucks.configure(this.express.get('views'), {
      watch: this.isDEV,
      express: this.express,
      autoescape: true
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(routes)
  }

  handlers () {
    this.express.use((req, res, next) => {
      var err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    // development error handler
    // will print stacktrace
    if (this.express.get('env') === 'development') {
      this.express.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.render('error', {
          message: err.message,
          error: err
        })
      })
    }

    // production error handler
    // no stacktraces leaked to user
    this.express.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: {}
      })
    })
  }
}

module.exports = new App().express
