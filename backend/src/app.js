const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'], // Allow frontend during development
};
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(limiter);

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/products', productRoutes); // Product Routes
app.use('/api/cart', cartRoutes);        // Cart Routes

app.use(errorMiddleware);
module.exports = app;
