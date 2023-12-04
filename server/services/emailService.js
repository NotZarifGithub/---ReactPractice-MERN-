const nodemailer = require('nodemailer')
const Quote = require('../models/quoteModel')
const cron = require('node-cron')
const { getQuote } = require('../controllers/quoteController')
const config = require('../config/email')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "flacko.programming@gmail.com",
    pass: "xyftxohwborjxfzj",
  }
})

const sendMotivationalEmailNow = async (req, res) => {

  const {emailInput} = req.body

  try {
    console.log("Received email:", emailInput);
    const quote = await getQuote()
    console.log(quote)
    if(!quote) {
      console.log("No quotes found in the database")
    }
    
    const mailOptions = {
      from: "flacko.programming@gmail.com",
      to: emailInput,
      subject: "Motivational Quote of The Day",
      text: `Here's your daily motivational quote:\n\n${quote[0].quote} - ${quote[0].author}`
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
    
  } catch (error) {
    console.error(error)     
  }
}

const storeUserEmail = async (req, res) => {
  try {
    const {emailInput} = req.body
    config.userEmail = emailInput

  } catch (error) {
    console.error(error)
  }
}

const sendMotivationalEmailEveryday = async (req, res) => {

  const {emailInput} = req.body

  try {
    console.log("Received email:", emailInput);
    const quote = await getQuote()
    console.log(quote)
    if(!quote) {
      console.log("No quotes found in the database")
    }
    
    const mailOptions = {
      from: "flacko.programming@gmail.com",
      to: emailInput,
      subject: "Motivational Quote of The Day",
      text: `Here's your daily motivational quote:\n\n${quote[0].quote} - ${quote[0].author}`
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
    return emailInput

  } catch (error) {
    console.error(error)     
  }
}

cron.schedule("0 8 * * *", async () => {
  try {
    await sendMotivationalEmailEveryday()
  } catch (error) {
    console.error(error)
  }
})

module.exports = {
  sendMotivationalEmailNow,
  sendMotivationalEmailEveryday,
  storeUserEmail
}