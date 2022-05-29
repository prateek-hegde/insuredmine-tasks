const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const PolicyCarrierSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { versionKey: false }
)

const PolicyCarrier = mongoose.model(
    CONST.models.PolicyCarrier,
    PolicyCarrierSchema,
    CONST.models.PolicyCarrier
)
module.exports = PolicyCarrier
