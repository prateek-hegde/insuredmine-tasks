const mongoose = require('mongoose')
const { logger } = require('./')

mongoose
    .connect(process.env.MONGO_CONNECION_STRING)
    .then(() => {
        logger.info('database connected')
    })
    .catch((e) => {
        logger.error(e)
    })
