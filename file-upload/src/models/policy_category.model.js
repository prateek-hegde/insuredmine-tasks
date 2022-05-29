const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const PolicyCategorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { versionKey: false }
)

const PolicyCategory = mongoose.model(
    CONST.models.PolicyCategory,
    PolicyCategorySchema,
    CONST.models.PolicyCategory
)
module.exports = PolicyCategory
