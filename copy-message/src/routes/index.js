const router = require('express').Router()

router.use('/message', require('./message.routes'))

module.exports = router
