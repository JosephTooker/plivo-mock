const express = require('express')

const { sendText, receiveText } = require('../controllers/text.js')

const router = express.Router()

router.post('/text', sendText)
router.post('/sms', receiveText)

module.exports = router