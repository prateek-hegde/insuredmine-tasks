const mongoose = require('mongoose')
const { CONST } = require('../utils/constants')

const { Schema } = mongoose

const AgentSchema = new Schema(
    {
        agentName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { versionKey: false }
)

const Agent = mongoose.model(
    CONST.models.Agent,
    AgentSchema,
    CONST.models.Agent
)
module.exports = Agent
