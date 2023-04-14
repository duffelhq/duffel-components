import { BaggageSelectionModalHeader } from "@components/bags/BaggageSelectionModalHeader";
import type { Meta, StoryObj } from "@storybook/react";
import { OfferSliceSegment } from "src/types/Offer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_0000AUde3KwTztSRK1cznH.json");

export default {
  title: "BaggageSelectionModalHeader",
  component: BaggageSelectionModalHeader,
} as Meta;

type Story = StoryObj<typeof BaggageSelectionModalHeader>;

export const FirstStory: Story = {
  args: {
    segmentCount: 2,
    currentSegmentIndex: 0,
    currentSegment: offer.slices[0].segments[0] as OfferSliceSegment,
    setCurrentSegmentIndex: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  },
};
