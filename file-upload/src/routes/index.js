const router = require('express').Router()

router.use('/file', require('./file.routes'))

module.exports = router
