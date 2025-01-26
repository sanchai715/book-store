# Book Store API

This project is a backend API for a book store called **“บ้านนายดิน”**, implementing functionalities for managing products, shopping carts, and promotional discounts. The API is built using **Node.js**, **Express**, and **MongoDB**.

---

## Features

### Product Module
- **CRUD Operations**:
  - Create, Read (with Pagination), Update, and Delete products.
- Initial seed data for Harry Potter book series.

### Cart Module
- **Add Products to Cart**
- **Calculate Total Price** with discounts applied based on the number of unique books:
  - 2 unique books: 10% discount
  - 3 unique books: 20% discount
  - 4 unique books: 30% discount
  - 5 unique books: 40% discount
  - 6 unique books: 50% discount
  - 7 unique books: 60% discount
- **Clear the Cart**

### Testing
- Unit tests written using **Jest**.
- API tests written using **Cypress**.

---

## Setup Instructions

### 1. Prerequisites
- Install **Node.js** (v14+)
- Install **MongoDB**

---

### 2. Clone the Repository
```bash
git clone https://github.com/SanchaiN-Dev/book-store.git
cd book-store/backend
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Setup Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore
NODE_ENV=development
JWT_SECRET=your-secret-key
```

---

### 5. Seed Initial Data
To populate the database with initial product data, run:
```bash
npm run seed
```

This will insert the Harry Potter book series into the database.

---

### 6. Start the Server
To start the development server:
```bash
npm run dev
```

To start the server in production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

---

### 7. Testing

#### Run Unit Tests with Jest
```bash
npm test
```

#### Run API Tests with Cypress
```bash
npx cypress open
```

---

## API Endpoints

### **Product Endpoints**

1. **Create Product**
   - **POST** `/api/products`
   - Request Body:
     ```json
     {
       "name": "Harry Potter and the Philosopher's Stone",
       "price": 100
     }
     ```

2. **Get Products (Paginated)**
   - **GET** `/api/products?page=1&limit=10`

3. **Update Product**
   - **PUT** `/api/products/:id`
   - Request Body:
     ```json
     {
       "price": 150
     }
     ```

4. **Delete Product**
   - **DELETE** `/api/products/:id`

---

### **Cart Endpoints**

1. **Add Product to Cart**
   - **POST** `/api/cart/add`
   - Request Body:
     ```json
     {
       "productId": "<product_id>",
       "quantity": 2
     }
     ```

2. **Calculate Cart Total**
   - **GET** `/api/cart/calculate`

3. **Clear Cart**
   - **DELETE** `/api/cart/clear`

---

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection logic
│   ├── controllers/
│   │   ├── productController.js # Product-related logic
│   │   ├── cartController.js    # Cart-related logic
│   ├── middlewares/
│   │   ├── paginationMiddleware.js # Middleware for pagination
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   ├── routes/
│   │   ├── productRoutes.js     # Product routes
│   │   ├── cartRoutes.js        # Cart routes
│   ├── services/
│   │   ├── promotionService.js  # Logic for discounts and promotions
│   ├── migrations/
│   │   ├── seedData.js          # Script for seeding initial data
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── test/
│   ├── setup.js                 # MongoDB in-memory setup for testing
│   ├── product.test.js          # Jest tests for Product API
│   ├── cart.test.js             # Jest tests for Cart API
├── jest.config.js               # Jest configuration file
├── package.json                 # Dependencies and scripts
├── .env                         # Environment variables
```

---

## Future Enhancements
- Add user authentication using **JWT**.
- Implement advanced cart features like inventory tracking.
- Create a frontend using **React** or **Vue.js**.
- Integrate a CI/CD pipeline for automated testing and deployment.

---

## License
This project is licensed under the MIT License.

