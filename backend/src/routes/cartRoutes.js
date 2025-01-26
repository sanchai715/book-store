const express = require('express');
const { addToCart, calculateCart, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);       // Add Product to Cart
router.get('/calculate', calculateCart); // Calculate Cart Total with Promotions
router.delete('/clear', clearCart);

module.exports = router;
