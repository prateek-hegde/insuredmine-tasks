const schedule = require('node-schedule')
const { MessageSource, MessageDestination } = require('../models')
const { ErrorCodes, logger } = require('../utils')

Date.prototype.isValid = function () {
    return this.getTime() === this.getTime()
}

const scheduleOperation = async (date) => {
    schedule.scheduleJob(date, async () => {
        await copyMessage(date)
    })
}

const copyMessage = async (date) => {
    logger.debug('started', date)
    const messages = await MessageSource.find({ timeStamp: date }).lean()
    const records = messages.map((element) => {
        return { message: element.message, timeStamp: element.timeStamp }
    })

    await MessageDestination.insertMany(records)
    logger.debug('ended')
}

const saveMessage = async (req, res, next) => {
    const { timeStamp } = req.body

    const date = new Date(timeStamp)

    if (!date.isValid()) {
        return res.status(400).send({
            success: false,
            message: 'invalid date',
        })
    }

    if (date <= new Date()) {
        return res.status(400).send({
            success: false,
            message: 'date should be futuristic',
        })
    }

    try {
        Promise.all([
            MessageSource.create(req.body),
            scheduleOperation(timeStamp),
        ])

        return res.status(201).send({
            success: true,
            message: 'Message Saved',
        })
    } catch (error) {
        logger.error(
            `business_logic/saveMessage.js: createPosts() | ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    saveMessage,
}
