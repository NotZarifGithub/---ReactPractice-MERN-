const mongoose = require('mongoose')

const Quote = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true, 
    maxlength: 200
  }
}, {timestamps: true})

module.exports = mongoose.model("Quote", Quote)