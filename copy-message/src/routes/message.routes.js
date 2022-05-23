const router = require('express').Router()
const { saveMessage } = require('../business_logic/message')
const { validateBodySchema } = require('../middlewares')
const { messageSchema } = require('../schema')

router.post('/', validateBodySchema(messageSchema), saveMessage)

module.exports = router
