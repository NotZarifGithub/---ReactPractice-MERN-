const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService'); 

router.post('/sendMotivationalEmail', emailService.sendMotivationalEmail);

module.exports = router;
