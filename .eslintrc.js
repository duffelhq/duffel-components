module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: [
    "**/dist/**",
    "**/cdn-dist/**",
    "**/react-dist/**",
    "__generated__**",
  ],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  overrides: [],
  plugins: ["@typescript-eslint", "jsx-a11y", "import"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": 0,
  },
};
