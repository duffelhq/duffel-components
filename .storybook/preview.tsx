import React from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/styles/global.css";

// We wrap all stories in a div with the duffel-components class
// so that we can use the duffel-components styles in our stories.
const decorators: [Decorator] = [
  (Story) => (
    <div className="duffel-components">
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators,
};

export default preview;