import type { Meta, StoryObj } from "@storybook/react";
import {
  DuffelOfferSlice,
  DuffelOfferSliceProps,
} from "../components/DuffelOfferSlice";
import MOCK_OFFER from "../fixtures/offers/off_0000AUde3KwTztSRK1cznH.json";

export default {
  title: "DuffelOfferSlice",
  component: DuffelOfferSlice,
} as Meta;

type DuffelOfferSliceStory = StoryObj<typeof DuffelOfferSlice>;

const defaultProps: DuffelOfferSliceProps = {
  slice: MOCK_OFFER.slices[0],
  isExpanded: true,
};

export const Default: DuffelOfferSliceStory = { args: defaultProps };

export const WithExpandedView: DuffelOfferSliceStory = {
  args: { ...defaultProps, variant: "outlined" },
};
