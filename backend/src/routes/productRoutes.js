const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);       // Create Product
router.get('/', getProducts);         // Get Products with Pagination
router.put('/:id', updateProduct);    // Update Product
router.delete('/:id', deleteProduct); // Delete Product

module.exports = router;
