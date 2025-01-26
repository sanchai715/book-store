const User = require('../models/User');

const getAllUsers = async () => {
  return await User.find();
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

module.exports = { getAllUsers, createUser };
