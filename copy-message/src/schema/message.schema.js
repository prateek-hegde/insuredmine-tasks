const joi = require('joi')

const messageSchema = joi.object({
    message: joi.string().required().max(255),
    // .messages(joiStringErrorMessage('title', true, 50)),
    timeStamp: joi.string().required(),
    // .messages(joiStringErrorMessage('content', true, 255)),
})

module.exports = { messageSchema }
