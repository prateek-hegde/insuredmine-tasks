const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const UserAccountSchema = new Schema(
    {
        accountName: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: CONST.models.User,
            required: true,
        },
    },

    { versionKey: false }
)

const UserAccount = mongoose.model(
    CONST.models.UserAccount,
    UserAccountSchema,
    CONST.models.UserAccount
)
module.exports = UserAccount
