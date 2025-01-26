module.exports = {
    testEnvironment: 'node', // Use 'node' environment for API testing
    testTimeout: 10000,      // Increase timeout for async database operations
    verbose: true,           // Show detailed test results
    setupFilesAfterEnv: ['./test/setup.js'], // Setup in-memory MongoDB before tests
  };
  