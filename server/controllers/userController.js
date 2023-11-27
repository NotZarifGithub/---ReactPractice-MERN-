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

// Get user by Id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).json({message: "User does not exist!"})
    }
    
    res.status(200).json({message: "Successfully found user!"})

  } catch (error) {
    console.error(error)
  }
}

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne(req.body.email)

    if (!user) {
      res.status(404).json({message: "User does not exist!"})
    }

    res.status(200).json({message: "User found successfully!", user})
    
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

// Update user by id
const updateUserById = async (req, res) => {
  try {

    const userId = req.params.id
    if (!userId) return res.status(404).json({message: "User not exist!"})

    const {name, email, password} = req.body
    const updatedData = {
      name,
      email,
      password
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData)

    res.status(200).json({message: "User updated successfully!", updatedUser})

  } catch (error) {
    console.error(error)
  }
}

// Delete user by id
const deleteUserById = async (req, res) => {
  try {

    const user = req.params.id
    if (!user) {
      return res.status(404).json({message: 'User not found!'})
    }

    const deleteUser = await User.findByIdAndDelete(user)
    res.status(200).json({message: "User deleted successfully"})

  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById
};
