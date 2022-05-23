const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const MessageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        timeStamp: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
)

const MessageSource = mongoose.model(CONST.models.MessageSource, MessageSchema)
module.exports = MessageSource
