import type { Meta, StoryObj } from "@storybook/react";
import { BaggageSelectionModalHeader } from "../components/DuffelAncillaries/bags/BaggageSelectionModalHeader";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_0000AUde3KwTztSRK1cznH.json");

export default {
  title: "BaggageSelectionModalHeader",
  component: BaggageSelectionModalHeader,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof BaggageSelectionModalHeader>;

export const FirstStory: Story = {
  args: {
    segmentCount: 2,
    currentSegmentIndex: 0,
    currentSegment: offer.slices[0].segments[0],
    setCurrentSegmentIndex: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  },
};
