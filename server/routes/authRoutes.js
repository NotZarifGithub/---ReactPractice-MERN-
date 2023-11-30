const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const verifyToken = require('../utils/verifyToken.js')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/update-user-by-id/:id', verifyToken, userController.updateUserById)
router.delete('/delete-user-by-id/:id', verifyToken, userController.deleteUserById)

module.exports = router