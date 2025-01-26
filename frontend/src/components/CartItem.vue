<template>
    <div class="flex justify-between items-center border-b pb-2 mb-2">
      <div>
        <h3 class="text-lg font-semibold">{{ item.product.name }}</h3>
        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
      </div>
      <p class="text-gray-800 font-semibold">{{ item.product.price * item.quantity }} THB</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
  </script>