<template>
    <div class="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="name" class="block mb-1 text-gray-600">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1 text-gray-600">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { register } from '@/utils/api';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSignup() {
        try {
          await register({ name: this.name, email: this.email, password: this.password });
          alert('Registration successful! You can now sign in.');
          this.$router.push('/signin'); // Redirect to Signin page
        } catch (error) {
          alert('Error registering. Please try again.');
        }
      },
    },
  };
  </script>