const mongoose = require('mongoose')

const Email = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model("Email", Email)