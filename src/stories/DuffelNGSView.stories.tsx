import type { Meta, StoryObj } from "@storybook/react";
import {
  DuffelNGSView,
  DuffelNGSViewProps,
} from "../components/DuffelNGSView/DuffelNGSView";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_0000Adw9MD7yDHXIXxdjfG.json");

export default {
  title: "DuffelNGSView",
  component: DuffelNGSView,
} as Meta;

type DuffelNGSViewStory = StoryObj<typeof DuffelNGSView>;

const defaultProps: DuffelNGSViewProps = {
  offers: [offer],
  sliceIndex: 0, // TODO: generate a few more offers with realistic data for comparison
};

export const Default: DuffelNGSViewStory = {
  args: defaultProps,
};
