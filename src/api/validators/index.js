const Joi = require('joi')

const getHeartRate = Joi.object({
  id: Joi.number().required(),
})

module.exports = {
  getHeartRate
}
