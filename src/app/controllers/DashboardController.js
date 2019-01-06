const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    const date = moment()
    const { user } = req.session

    if (!user.provider) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard/clients', { providers })
    }

    let appointments = await Appointment.findAll({
      where: {
        provider_id: user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    })

    console.log(appointments)

    return res.render('dashboard/providers', { appointments })
  }
}

module.exports = new DashboardController()
