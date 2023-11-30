const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register user
const registerUser = async (req, res, next) => {
  try {

    const { username, email, password} = req.body

    // check if user exist
    const userExist = await User.findOne({email})
    
    if (userExist) {
      res.status(401).json({
        message: "User already exist!"
      })
    } 

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username, 
      email, 
      password: hashedPassword 
    })

    res.status(200).json({ 
      message: "User successfully registered!",
      user 
    })

  } catch (error) {
    next(error)
  }
}

// login user
const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    if (!user) {
      res.status(401).json({message: "User not found"})
    }

    // verify password
    const validPassword = bcrypt.compare(password, user.password)

    if (!validPassword) {
      res.status(401).json({message: "Invalid Password"})
    }
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({ 
      message: "User successfully logged in!",
      user 
    })

  } catch (error) {
    next(error)
  }
}

// Update user by id
const updateUserById = async (req, res, next) => {
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
    next(error)
  }
}

// Delete user by id
const deleteUserById = async (req, res, next) => {
  try {

    const user = req.params.id
    if (!user) {
      return res.status(404).json({message: 'User not found!'})
    }

    const deleteUser = await User.findByIdAndDelete(user)
    res.status(200).json({message: "User deleted successfully"})

  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById
};
