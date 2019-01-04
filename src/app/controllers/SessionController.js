const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('user not found')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('password not valid')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }
}

module.exports = new UserController()
