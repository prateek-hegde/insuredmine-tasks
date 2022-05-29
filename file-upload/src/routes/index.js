const router = require('express').Router()

router.use('/file', require('./file.routes'))
router.use('/search', require('./search.routes'));

module.exports = router
