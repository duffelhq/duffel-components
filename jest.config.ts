import type { Config } from "jest";

const config: Config = {
  silent: true,
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/tests"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "@lib/(.*)$": "<rootDir>/src/lib/$1",
    "@components/(.*)$": "<rootDir>/src/components/$1",
  },
};

export default config;
