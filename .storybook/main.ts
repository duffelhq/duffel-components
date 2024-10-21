import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/stories/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),

  docs: {},

  webpackFinal: (config) => {
    // Ensure that Storybook can handle aliased imports like '@lib'
    config.resolve = {
      ...config.resolve,
      plugins: [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve?.extensions,
        }),
      ],
    };
    return config;
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
