const router = require('express').Router()
const { processFile } = require('../business_logic/file_processor')



router.post('/', processFile)

module.exports = router
