const request = require('supertest');
const app = require('../src/app'); // Import your app
const db = require('./setup'); // Import in-memory database
const Product = require('../src/models/Product');

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());
afterEach(async () => await db.clear());

describe('Cart API', () => {
  it('should add a product to the cart', async () => {
    const product = await Product.create({ name: 'Book 1', price: 100 });
    const response = await request(app).post('/api/cart/add').send({ productId: product._id, quantity: 2 });
    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(1);
    expect(response.body.items[0].quantity).toBe(2);
  });

  it('should calculate cart total with promotions', async () => {
    const product1 = await Product.create({ name: "Harry Potter and the Philosopher's Stone", price: 100 });
    const product2 = await Product.create({ name: "Harry Potter and the Chamber of Secrets", price: 100 });
  
    // Add items to the cart
    await request(app).post('/api/cart/add').send({ productId: product1._id, quantity: 2 }); // 2 quantities of product1
    await request(app).post('/api/cart/add').send({ productId: product2._id, quantity: 1 }); // 1 quantity of product2
  
    // Calculate the cart
    const response = await request(app).get('/api/cart/calculate');
  
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: expect.objectContaining({
            _id: product1._id.toString(),
            name: "Harry Potter and the Philosopher's Stone",
            price: 100,
          }),
          quantity: 2,
        }),
        expect.objectContaining({
          product: expect.objectContaining({
            _id: product2._id.toString(),
            name: "Harry Potter and the Chamber of Secrets",
            price: 100,
          }),
          quantity: 1,
        }),
      ])
    );
    expect(response.body.discount).toBe(20); // Given discount
    expect(response.body.finalPrice).toBe(280); // Total price - Discount
  });

  it('should clear the cart', async () => {
    const product = await Product.create({ name: 'Book 1', price: 100 });
    await request(app).post('/api/cart/add').send({ productId: product._id, quantity: 2 });

    const response = await request(app).delete('/api/cart/clear');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Cart cleared successfully');
  });
});
