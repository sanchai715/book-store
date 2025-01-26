const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique constraint
  price: { type: Number, required: true, default: 100 },
});

module.exports = mongoose.model('Product', productSchema);
