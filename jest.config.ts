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

process.env.DUFFEL_API_URL = "https://api.duffel.com";

export default config;
