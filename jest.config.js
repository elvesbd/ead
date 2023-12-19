module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  //coveragePathIgnorePatterns: ['/test/data-builder/person/PersonBuilder.ts'],
  moduleNameMapper: {
    '^@/test/(.*)': '<rootDir>/test/$1',
    '^@/(.*)': '<rootDir>/src/$1',
  },
};
