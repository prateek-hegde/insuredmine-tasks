const joi = require('joi')

const messageSchema = joi.object({
    message: joi.string().required().max(255),
    timeStamp: joi.string().required(),
})

module.exports = { messageSchema }
