const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'dev_secret_fallback';
  return jwt.sign({ id }, secret, {
    expiresIn: '7d',
  });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        message: 'Account created successfully!',
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({
      message: 'Server error. Please try again.',
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Explicitly select password to ensure it's loaded
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful!',
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('CRITICAL LOGIN ERROR:', error);
    res.status(500).json({ 
      message: 'Server error. Please try again.',
      error: error.message 
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Profile Error:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

module.exports = { signup, login, getProfile };
