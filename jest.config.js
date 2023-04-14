const config = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "@lib/(.*)$": "<rootDir>/src/lib/$1",
    "@components/(.*)$": "<rootDir>/src/components/$1",
  },
};

module.exports = config;
