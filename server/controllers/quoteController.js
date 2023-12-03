const Quote = require('../models/quoteModel')

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

const getAllQuotesByName = async (req, res, next) => {
  try {
    const {name} = req.params
    if (!name) {
      res.status(401).json({message: "Cannot find person"})
    }
    const quotes = await Quote.find({name})
    res.status(200).json(quotes)

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

module.exports = {
  getAllQuotes,
  getAllQuotesByName,
  createQuote
}