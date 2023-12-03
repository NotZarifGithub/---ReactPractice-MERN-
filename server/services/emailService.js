const nodemailer = require('nodemailer')
const Quote = require('../models/quoteModel')
const cron = require('node-cron')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "flacko.programming@gmail.com",
    pass: "xyftxohwborjxfzj",
  }
})

const getRandomQuote = async () => {
  try {

    const count = await Quote.countDocuments()
    const randomIndex = Math.floor(Math.random() * count)
    const randomQuote = await Quote.findOne().skip(randomIndex)
    return randomQuote[0]; 

    return randomQuote
  } catch (error) {
    console.error('Error fetching random quote:', error)
  }
}

const sendMotivationalEmail = async () => {
  try {
    const quote = getRandomQuote()
    if(!quote) {
      console.log("No quotes found in the database")
    }
    
    const mailOptions = {
      from: "flacko.programming@gmail.com",
      to: "ronaldo7zarif@gmail.com",
      subject: "Motivational Quote of The Day",
      text: `Here's your daily motivational quote:\n\n${quote.quote} - ${quote.name}`
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
    
  } catch (error) {
    console.error(error)     
  }
}

module.exports = {
  sendMotivationalEmail
}