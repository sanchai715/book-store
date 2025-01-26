const Product = require('../models/Product');
const logger = require('../utils/logger');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    logger.info(`Product created: ${product.name}`);
    res.status(201).json(product);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product name must be unique' });
    }
    logger.error(`Error creating product: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};


// Get Products
exports.getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query; // Extract query parameters
    const pageNumber = page ? parseInt(page, 10) : 1; // Default to page 1
    const limitNumber = limit ? parseInt(limit, 10) : 10; // Default to 10 items per page

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    const skip = (pageNumber - 1) * limitNumber; // Calculate the number of documents to skip
    const totalProducts = await Product.countDocuments(); // Get the total number of products
    const totalPages = Math.ceil(totalProducts / limitNumber); // Calculate total pages

    const products = await Product.find()
      .skip(skip)
      .limit(limitNumber);

    logger.info(
      `Fetched ${products.length} products for page ${pageNumber} with limit ${limitNumber}`
    );

    res.status(200).json({
      data: products,
      currentPage: pageNumber,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      logger.warn(`Product not found: ID ${req.params.id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    logger.info(`Product updated: ${product.name}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error(`Error updating product: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      logger.warn(`Product not found: ID ${req.params.id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    logger.info(`Product deleted: ${product.name}`);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    logger.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};