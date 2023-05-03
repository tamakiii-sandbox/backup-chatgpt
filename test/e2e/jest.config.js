module.exports = {
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testMatch: ['<rootDir>/**/*.test.js'],
};