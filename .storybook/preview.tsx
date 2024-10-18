import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import "../src/styles/global.css";

const decorators: [Decorator] = [
  (Story): React.ReactElement => (
    <div style={{ padding: "24px", margin: 0 }}>
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
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
