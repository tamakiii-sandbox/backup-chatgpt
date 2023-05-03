module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.[tj]s'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
};
