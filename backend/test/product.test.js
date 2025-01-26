const request = require('supertest');
const app = require('../src/app'); // Import your app
const db = require('./setup'); // Import in-memory database

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

  it('should fetch paginated products', async () => {
    await request(app).post('/api/products').send({ name: 'Book 1', price: 100 });
    await request(app).post('/api/products').send({ name: 'Book 2', price: 100 });

    const response = await request(app).get('/api/products?page=1&limit=1');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.totalPages).toBe(2);
  });

  it('should update a product', async () => {
    const product = await request(app).post('/api/products').send({ name: 'Book', price: 100 });
    const response = await request(app).put(`/api/products/${product.body._id}`).send({ price: 150 });
    expect(response.status).toBe(200);
    expect(response.body.price).toBe(150);
  });

  it('should delete a product', async () => {
    const product = await request(app).post('/api/products').send({ name: 'Book', price: 100 });
    const response = await request(app).delete(`/api/products/${product.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });
});
