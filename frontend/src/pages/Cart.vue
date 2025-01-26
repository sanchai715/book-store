<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
    <div v-if="cart.items && cart.items.length > 0" class="space-y-4">
      <CartItem v-for="item in cart.items" :key="item.product._id" :item="item" />
      <div class="flex justify-between items-center border-b pb-2 mb-2">
      <div>
        <h3 class="text-lg font-semibold">Discount: </h3>
      </div>
      <p class="text-gray-800 font-semibold">{{ cart.discount }} THB</p>
    </div>
      <div class="flex justify-between items-center pt-4">
        <p class="text-lg font-semibold">Total: {{ cart.finalPrice }} THB</p>
        <button @click="handleClearCart" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Cart</button>
      </div>
    </div>
    <p v-else class="text-center text-gray-500">Your cart is empty!</p>
  </div>
</template>

<script>
import { getCart, clearCart } from '@/utils/api';
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem },
  data() {
    return { cart: { items: [], totalPrice: 0, discount: 0, finalPrice: 0 } }; // Fallback to default cart
  },
  async created() {
    try {
      const response = await getCart();
      console.log(response.data)
      this.cart = response.data || { items: [], totalPrice: 0, discount: 0, finalPrice: 0 }; // Handle undefined data
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },
  methods: {
    async handleClearCart() {
      try {
        await clearCart();
        this.cart = { items: [], totalPrice: 0, discount: 0, finalPrice: 0 }; // Reset cart
        alert('Cart cleared!');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },
  },
};
</script>
