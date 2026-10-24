import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Expense } from '../models/Expense.js';
import { Budget } from '../models/Budget.js';

// Helper to sign JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'expensex_secret_default',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Register a new user
 */
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists!' });
    }

    const newUser = await User.create({
      username,
      password,
      isAdmin: false,
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created! You can now log in.',
      token,
      user: { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

/**
 * User login
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password!' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: `Login successful! Welcome, ${user.username}.`,
      token,
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

/**
 * Forgot password - resets to default123 (hashed with bcrypt via pre-save)
 */
export const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Username not found!' });
    }

    user.password = 'default123';
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset to 'default123'. Please login.",
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Server error during password reset' });
  }
};

/**
 * Change user password
 */
export const changePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is wrong!' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully!',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Server error during password change' });
  }
};

/**
 * Admin: Get all users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

/**
 * Admin: Create a new user with optional admin status
 */
export const createUserByAdmin = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const userExists = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'Username already exists!' });
    }

    const newUser = await User.create({
      username,
      password,
      isAdmin: Boolean(isAdmin),
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin },
    });
  } catch (error) {
    console.error('Create user by admin error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating user' });
  }
};


/**
 * Admin: Delete a user
 */
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { username } = req.params;

    if (username.toLowerCase() === 'admin') {
      return res.status(403).json({ success: false, message: 'Default admin cannot be deleted!' });
    }

    const deletedUser = await User.findOneAndDelete({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    // Clean up expenses and budget for this user
    await Expense.deleteMany({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });
    await Budget.findOneAndDelete({
      username: { $regex: new RegExp(`^${username}$`, 'i') },
    });

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
};
