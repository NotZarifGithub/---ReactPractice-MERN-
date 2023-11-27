const User = require('../models/userModel.js')

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find()
    
    res.status(200).json({
      message: "Successfully getting all users!", 
      user
    })

  } catch (error) {
    console.error(error)
  }
}

// Create user
const createUser = async (req, res) => {
  try {

    const { name, email, password} = req.body
    const user = await User.create({
      name, 
      email, 
      password 
    })
    
    res.status(200).json({ 
      message: "User successfully created!",
      user 
    })

  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  // ...
};
