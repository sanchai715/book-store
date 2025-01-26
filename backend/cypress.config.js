const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000/api', // Your API base URL
    supportFile: false, // Disable support file if unnecessary
  },
});
