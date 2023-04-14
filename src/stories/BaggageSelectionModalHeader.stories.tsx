import type { Meta, StoryObj } from "@storybook/react";
import { BaggageSelectionModalHeader } from "../components/BaggageSelectionModalHeader";
import { offer } from "../fixtures/offers/off_0000AUa6E3NVYZR1Jx1hop";
import { OfferSliceSegment } from "src/types/Offer";

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
