// ================================
// Optimized API for Calculating Promotions
// ================================

const calculateDiscount = (itemGroups, productDetails) => {
  const discounts = [0, 0, 10, 20, 30, 40, 50, 60]; // Discounts by unique items
  let totalDiscount = 0;
  const resultProducts = [];

  itemGroups.forEach((group) => {
    const discount = discounts[group.length];
    const groupDetails = group.map((productId) => {
      const product = productDetails[productId];
      return {
        name: product.name,
        quantity: 1, // Each product in the group contributes one unit to the discount
        price: product.price,
      };
    });

    const groupPrice = groupDetails.reduce((total, product) => total + product.price, 0);
    totalDiscount += (groupPrice * discount) / 100;
    resultProducts.push(...groupDetails);
  });

  return { totalDiscount, resultProducts };
};

const groupItemsForPromotion = (cartItems) => {
  const itemGroups = [];
  const itemMap = {};

  // Create a map of product quantities
  cartItems.forEach((item) => {
    const productId = item.product.toString();
    itemMap[productId] = (itemMap[productId] || 0) + item.quantity;
  });

  // Create groups of unique items
  while (Object.keys(itemMap).length) {
    const group = [];
    for (const productId in itemMap) {
      group.push(productId);
      itemMap[productId] -= 1;
      if (itemMap[productId] === 0) delete itemMap[productId];
    }
    itemGroups.push(group);
  }

  return itemGroups;
};

// Main Function for Calculating Promotion
const calculatePromotion = (cartItems, products) => {
  const productDetails = products.reduce((map, product) => {
    map[product._id.toString()] = product;
    return map;
  }, {});

  const itemGroups = groupItemsForPromotion(cartItems);
  const { totalDiscount, resultProducts } = calculateDiscount(itemGroups, productDetails);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * productDetails[item.product.toString()].price,
    0
  );

  return {
    products: resultProducts,
    totalPrice,
    discount: totalDiscount,
    finalPrice: totalPrice - totalDiscount,
  };
};

// Optimized Service for Calculating Cart
const calculateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });

    const products = cart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.product.price,
    }));

    const promotion = calculatePromotion(cart.items, products);

    res.status(200).json({
      products: promotion.products, // Return products with name, quantity, price
      totalPrice: promotion.totalPrice,
      discount: promotion.discount,
      finalPrice: promotion.finalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { calculatePromotion, calculateCart };

// ================================
// Updated Unit Tests for Product API
// ================================

const request = require('supertest');
const app = require('../src/app'); // Import your app
const db = require('./setup'); // Import in-memory database
const Product = require('../src/models/Product');

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());
afterEach(async () => await db.clear());

describe('Product API', () => {
  it('should create a product', async () => {
    const response = await request(app).post('/api/products').send({
      name: 'Harry Potter and the Philosopher\'s Stone',
      price: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Harry Potter and the Philosopher\'s Stone');
  });

  it('should fetch all products', async () => {
    // Seed products into the database
    await Product.create({ name: 'Book 1', price: 100 });
    await Product.create({ name: 'Book 2', price: 100 });
  
    // Call the API to fetch all products
    const response = await request(app).get('/api/products');
  
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2); // Check the length of the `data` array
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Book 1', price: 100 }),
        expect.objectContaining({ name: 'Book 2', price: 100 }),
      ])
    );
  });  

  it('should fetch paginated products', async () => {
    // Seed products into the database
    const product1 = await Product.create({ name: 'Book 1', price: 100 });
    const product2 = await Product.create({ name: 'Book 2', price: 100 });
  
    // Fetch the first page with a limit of 1 product per page
    const response = await request(app).get('/api/products?page=1&limit=1');
  
    // Assertions for response status and structure
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1); // Ensure only 1 product is returned
    expect(response.body.currentPage).toBe(1); // Verify the current page
    expect(response.body.totalPages).toBe(2); // Verify the total number of pages
    expect(response.body.totalProducts).toBe(2); // Verify total number of products
  
    // Check the product data for the first page
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: product1._id.toString(),
          name: 'Book 1',
          price: 100,
        }),
      ])
    );
  
    // Fetch the second page with a limit of 1 product per page
    const responsePage2 = await request(app).get('/api/products?page=2&limit=1');
  
    // Assertions for the second page
    expect(responsePage2.status).toBe(200);
    expect(responsePage2.body.data.length).toBe(1); // Ensure only 1 product is returned
    expect(responsePage2.body.currentPage).toBe(2); // Verify the current page
    expect(responsePage2.body.totalPages).toBe(2); // Total pages remain the same
    expect(responsePage2.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: product2._id.toString(),
          name: 'Book 2',
          price: 100,
        }),
      ])
    );
  });  

  it('should update a product', async () => {
    const product = await Product.create({ name: 'Book', price: 100 });
    const response = await request(app).put(`/api/products/${product._id}`).send({ price: 150 });
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(150);
  });

  it('should delete a product', async () => {
    const product = await Product.create({ name: 'Book', price: 100 });
    const response = await request(app).delete(`/api/products/${product._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });
});