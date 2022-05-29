const router = require('express').Router()
const upload = require('express-fileupload')
const { saveUserData } = require('../business_logic/save')

router.post('/', upload(), saveUserData)

module.exports = router
