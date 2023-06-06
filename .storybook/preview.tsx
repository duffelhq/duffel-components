import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import "../src/styles/global.css";

// We wrap all stories in a div with the duffel-components class
// so that we can use the duffel-components styles in our stories.
const decorators: [Decorator] = [
  (Story): React.ReactElement => (
    <div className="duffel-components" style={{ padding: "24px", margin: 0 }}>
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
