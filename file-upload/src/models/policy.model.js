const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const PolicySchema = new Schema(
    {
        policyNumber: {
            type: String,
            required: true,
        },
        policyStartDate: {
            type: String,
            required: true,
        },
        policyEndDate: {
            type: String,
            required: true,
        },
        policyCategory: {
            type: Schema.Types.ObjectId,
            ref: CONST.models.PolicyCategory,
            required: true,
        },
        policyCarrier: {
            type: Schema.Types.ObjectId,
            ref: CONST.models.PolicyCarrier,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: CONST.models.User,
            required: true,
        },
    },
    { versionKey: false }
)

PolicySchema.index({
    policyNumber: 1,
})

const Policy = mongoose.model(
    CONST.models.Policy,
    PolicySchema,
    CONST.models.Policy
)
module.exports = Policy
