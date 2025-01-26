<template>
    <div>
      <Navbar />
      <main class="container mx-auto mt-6 px-4">
        <router-view /> <!-- This renders the child routes -->
      </main>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
    components: { Navbar },
  };
  </script>