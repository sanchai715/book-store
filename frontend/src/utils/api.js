import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const getBooks = () => api.get('/products'); // Fetch all books
export const getCart = () => api.get('/cart/calculate'); // Get cart details
export const addToCart = (productId, quantity) => api.post('/cart/add', { productId, quantity });
export const clearCart = () => api.delete('/cart/clear');
export const login = (credentials) => api.post('/auth/login', credentials); // Optional: Login
export const register = (user) => api.post('/auth/register', user); // Optional: Register

export default api;