/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {tsconfig: 'tsconfig.json'},
    ],
  }
};

export default config;
