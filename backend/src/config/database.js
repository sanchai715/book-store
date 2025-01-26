const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      logger.error('Error connecting to MongoDB:', error.message);
      retries -= 1;
      logger.info(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
  process.exit(1); // Exit process if connection fails after retries
};

module.exports = connectDB;
