const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const connectDB = require('./config/database');
const seedDatabase = require('./migrations/seedData'); // Import the seed function
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Seed the database only in development mode
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    } else {
      logger.info('Skipping seeding: NODE_ENV is not development');
    }

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
