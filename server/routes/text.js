const express = require('express')

const { sendText } = require('../controllers/text.js')

const router = express.Router()

router.post('/text', sendText)

module.exports = router