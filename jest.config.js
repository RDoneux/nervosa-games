module.exports = {
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^app/(.*)$": "<rootDir>/src/app/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
    "^environments/(.*)$": "<rootDir>/src/environments/$1",
    "lodash-es": "lodash"
  },
  testPathIgnorePatterns: ['./node_modules/'],
  preset: "jest-preset-angular",
  globalSetup: "jest-preset-angular/global-setup",
  setupFilesAfterEnv: ["./setup-jest.js"],
};
