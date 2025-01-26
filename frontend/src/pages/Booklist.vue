<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-6">Explore Our Books</h1>
    <div v-if="loading" class="text-center text-gray-500">Loading books...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="book in books" :key="book._id" class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ book.name }}</h2>
        <p class="text-gray-600 mb-4">ราคา: {{ book.price }} THB</p>
        <button 
          class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          @click="handleAddToCart(book._id)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, addToCart } from '@/utils/api';

export default {
  data() {
    return {
      books: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async handleAddToCart(bookId) {
      try {
        await addToCart(bookId, 1); // Adds 1 quantity of the selected book to the cart
        this.$store.dispatch('fetchCart'); // Refresh cart count
        alert('Book added to cart!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add book to cart. Please try again.');
      }
    },
  },
  async mounted() {
    try {
      const response = await getBooks();
      this.books = response.data;
    } catch (error) {
      this.error = 'Failed to load books. Please try again later.';
      console.error('Error fetching books:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>