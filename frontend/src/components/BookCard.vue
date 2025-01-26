<template>
    <div class="border p-4 rounded shadow hover:shadow-md transition">
      <h2 class="text-lg font-bold mb-2">{{ book.name }}</h2>
      <p class="mb-4">Price: ${{ book.price }}</p>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="$emit('addToCart', book._id)"
      >
        Add to Cart
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
  };
  </script>