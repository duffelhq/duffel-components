import type { Meta, StoryObj } from "@storybook/react";
import { BaggageSelectionModalHeader } from "./BaggageSelectionModalHeader";
import { makeMockOfferSliceSegment } from "@lib/mocks/make-mock-offer-slice-segment";

export default {
  title: "BaggageSelectionModalHeader",
  component: BaggageSelectionModalHeader,
} as Meta;

type Story = StoryObj<typeof BaggageSelectionModalHeader>;

export const FirstStory: Story = {
  args: {
    segmentCount: 2,
    currentSegmentIndex: 0,
    currentSegment: makeMockOfferSliceSegment(),
    setCurrentSegmentIndex: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  },
};
