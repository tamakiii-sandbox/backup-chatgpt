module.exports = {
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  setupFiles: ['./jest.setup.js'],
  testMatch: ['<rootDir>/test/e2e/**/*.test.js'],
};