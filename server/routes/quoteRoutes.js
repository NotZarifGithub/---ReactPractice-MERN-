const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')

router.get('/get-all-quotes', quoteController.getAllQuotes)
router.get('/get-all-quotes-by-name/:name', quoteController.getAllQuotesByName)
router.post('/create-quote', quoteController.createQuote)

module.exports = router

