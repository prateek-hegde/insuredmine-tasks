const router = require('express').Router()
const { getPolicyInfo, getPolicyByUser } = require('../business_logic/search')

router.get('/user/:userName/policy', getPolicyInfo)
router.get('/policy', getPolicyByUser)

module.exports = router
