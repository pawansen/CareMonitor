const Joi = require('joi')

const getHeartRate = Joi.object({
  id: Joi.number().required(),
})

const createHeartRateValidate = Joi.object({
  clinical_data: Joi.object({
    heart_rate: Joi.object({
      data: Joi.array()
        .items(
          Joi.object({
            on_date: Joi.string().required(),
            measurement: Joi.string().required(),
          })
        )
        .required()
    })
  }).required(),
})
module.exports = {
  createHeartRateValidate,
  getHeartRate
}
