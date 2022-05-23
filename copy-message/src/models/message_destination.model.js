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

const MessageDestination = mongoose.model(
    CONST.models.MessageDestination,
    MessageSchema
)
module.exports = MessageDestination
