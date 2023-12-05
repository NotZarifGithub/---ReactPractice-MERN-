const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService'); 

router.post('/sendMotivationalEmailNow', emailService.sendMotivationalEmailNow);
router.post('/sendMotivationalEmailEveryday', emailService.sendMotivationalEmailEveryday);
router.post('/storeUserEmail', emailService.storeUserEmail)
router.get('/get-all-emails', emailService.listOfEmailsForCron)


module.exports = router;
