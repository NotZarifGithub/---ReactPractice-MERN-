const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); 

router.post('/sendMotivationalEmailNow', emailController.sendMotivationalEmailNow);
router.post('/sendMotivationalEmailEveryday', emailController.sendMotivationalEmailEveryday);
router.post('/storeUserEmail', emailController.storeUserEmail)
router.get('/get-all-emails', emailController.listOfEmailsForCron)


module.exports = router;
