const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()
const verifyToken = require('../utils/verifyToken.js')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/update-user-by-id/:id', verifyToken, authController.updateUserById)
router.delete('/delete-user-by-id/:id', verifyToken, authController.deleteUserById)

module.exports = router