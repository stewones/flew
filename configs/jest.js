module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testMatch: ['**/__tests__/**/*.spec.ts'],
};
