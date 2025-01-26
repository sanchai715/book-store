const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { calculateDiscount, groupItemsForPromotion } = require('../services/promotionService');
const logger = require('../utils/logger');

// Add Product to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    logger.info(`Product added to cart: Product ID ${productId}, Quantity ${quantity}`);
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Error adding product to cart: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

// Calculate Cart Total with Promotions
exports.calculateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const itemGroups = groupItemsForPromotion(cart.items);

    const discount = calculateDiscount(itemGroups);
    const totalPrice = totalItems * 100;
    const finalPrice = totalPrice - discount;
    const items = cart.items;

    res.status(200).json({
      items,
      discount,
      finalPrice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      logger.warn('Attempt to clear an empty cart');
      return res.status(404).json({ message: 'Cart is already empty' });
    }

    cart.items = []; // Clear all items from the cart
    await cart.save();
    logger.info('Cart cleared successfully');

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    logger.error(`Error clearing cart: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};