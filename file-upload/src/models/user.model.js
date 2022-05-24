const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: false,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: false,
        },
        zipCode: {
            type: String,
            required: false,
        },
        userType: {
            type: String,
            required: false,
        },
    },
    { versionKey: false }
)

const User = mongoose.model(CONST.models.User, UserSchema, CONST.models.User)
module.exports = User
