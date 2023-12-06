const nodemailer = require('nodemailer')
const Email = require('../models/emailModel')
const cron = require('node-cron')
const { getQuote } = require('./quoteController')

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
    const isEmailExist = await Email.findOne({emailInput})
    if (isEmailExist) {
      res.status(401).json({message: "Email already exist!"})
    }
    const newEmail = await Email.create({
      email: emailInput
    })
    res.status(201).json({message: "Email Listed", newEmail})
  } catch (error) {
    console.error(error)
  }
}

const sendMotivationalEmailEveryday = async (req, res) => {
  try {
    const emailInput = await listOfEmailsForCron();
    const quote = await getQuote();

    if (!quote) {
      console.error("No quotes found in the database");
    }

    await Promise.all(emailInput.map(async (email) => {
      const mailOptions = {
        from: "flacko.programming@gmail.com",
        to: email,
        subject: "Motivational Quote of The Day",
        text: `Here's your daily motivational quote:\n\n${quote[0].quote} - ${quote[0].author}`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    }));

    res.status(200).json({ message: "Motivational emails sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const listOfEmailsForCron = async (req, res) => {
  try {
    const emails = await Email.find()
    if (!emails) {
      return []
    }
    const allEmails = emails.map(emailsObj => emailsObj.email)
    return allEmails

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
  storeUserEmail,
  listOfEmailsForCron
}