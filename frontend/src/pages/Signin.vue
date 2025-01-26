<template>
    <div class="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Sign In</h1>
      <form @submit.prevent="handleSignin">
        <div class="mb-4">
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1 text-gray-600">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { login } from '@/utils/api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSignin() {
        try {
          const response = await login({ email: this.email, password: this.password });
          localStorage.setItem('token', response.data.token); // Save JWT token
          alert('Signed in successfully!');
          this.$router.push('/'); // Redirect to Booklist page
        } catch (error) {
          alert('Invalid email or password');
        }
      },
    },
  };
  </script>
  