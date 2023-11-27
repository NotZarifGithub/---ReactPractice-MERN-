const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/get-all-users', userController.getAllUsers)  
router.get('/get-user-by-id/:id', userController.getUser)
router.get('/get-user-by-email/:email', userController.getUserByEmail)
router.post('/create-user', userController.createUser)
router.post('/update-user-by-id/:id', userController.updateUserById)
router.delete('/delete-user-by-id/:id', userController.deleteUserById)

module.exports = router