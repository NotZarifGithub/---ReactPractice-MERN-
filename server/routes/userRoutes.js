const app = require('express')
const userController = require('../controllers/userController')
const router = app.Router()

router.get('/users/get-all-users', userController.getAllUsers)  
router.post('/users/create-user', userController.createUser)

module.exports = router