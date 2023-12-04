const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')

router.get('/get-all-quotes', quoteController.getAllQuotes)
router.post('/create-quote', quoteController.createQuote)
router.get('/get-quote', quoteController.getQuote)

module.exports = router

