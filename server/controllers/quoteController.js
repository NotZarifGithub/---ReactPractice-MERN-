const Quote = require('../models/quoteModel')
const axios = require('axios')

const getAllQuotes = async (req, res, next) => {
  try {
    const quote = await Quote.find()
    if (!quote) {
      res.status(401).json({message: "No quotes found!"})
    }
    res.status(200).json(quote)
  } catch (error) {
    next(error)
  }
}

const createQuote = async (req, res, next) => {
  try {
    const {name, quote} = req.body

    const existingQuote = await Quote.findOne({quote})
    if (existingQuote) {
      res.status(401).json({message: "Quote already exist!"})
    }

    const newQuote = await Quote.create({
      name,
      quote,
    })
    res.status(201).json({message: "New quote added!", newQuote})
  } catch (error) {
    next(error)
  }
}

const getQuote = async (req, res, error) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=success', {
      headers: {
        'X-Api-Key': 'a9BqC5BQIfMlTWxQUnMPFA==e8JZA5FWh3A8eUTm'
      }
    })
    return response.data
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllQuotes,
  createQuote,
  getQuote
}