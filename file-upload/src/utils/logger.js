const winston = require('winston')
const { config } = require('./config')

module.exports.logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
})
