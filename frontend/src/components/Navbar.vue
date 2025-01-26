<template>
    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex space-x-4">
        <li><router-link to="/">Books</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/signin">Sign In</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  