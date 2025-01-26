const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already in use.');
  }
  const user = new User({ name, email, password });
  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials.');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
  return { token, user };
};

module.exports = { registerUser, loginUser };
