const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHandler');

/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    sendSuccess(res, users, 'Users fetched successfully');
  } catch (error) {
    sendError(res, 'Error fetching users', 500, error.message);
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    
    sendSuccess(res, user, 'User fetched successfully');
  } catch (error) {
    sendError(res, 'Error fetching user', 500, error.message);
  }
};

/**
 * Create new user
 */
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return sendError(res, 'User with this email or username already exists', 400);
    }
    
    const user = await User.create({
      username,
      email,
      password // Note: In production, hash the password before saving
    });
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    sendSuccess(res, userResponse, 'User created successfully', 201);
  } catch (error) {
    sendError(res, 'Error creating user', 500, error.message);
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  try {
    const { username, email, avatar, status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar, status, lastSeen: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    
    sendSuccess(res, user, 'User updated successfully');
  } catch (error) {
    sendError(res, 'Error updating user', 500, error.message);
  }
};

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    
    sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    sendError(res, 'Error deleting user', 500, error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
