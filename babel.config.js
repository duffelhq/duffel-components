/**
 * This file is used by Storybook and Jest.
 */
module.exports = {
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 100,
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [],
};
