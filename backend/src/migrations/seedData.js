const mongoose = require('mongoose');
const Product = require('../models/Product'); // Product model
require('dotenv').config(); // Load environment variables

const products = [
  { name: 'Harry Potter and the Philosopher\'s Stone', price: 100 },
  { name: 'Harry Potter and the Chamber of Secrets', price: 100 },
  { name: 'Harry Potter and the Prisoner of Azkaban', price: 100 },
  { name: 'Harry Potter and the Goblet of Fire', price: 100 },
  { name: 'Harry Potter and the Order of the Phoenix', price: 100 },
  { name: 'Harry Potter and the Half-Blood Prince', price: 100 },
  { name: 'Harry Potter and the Deathly Hallows', price: 100 },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
    
    // Remove existing products
    await Product.deleteMany();
    console.log('Existing products deleted');

    // Insert sample data
    await Product.insertMany(products);
    console.log('Sample data inserted:', products);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed script
module.exports = seedDatabase;