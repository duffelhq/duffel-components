import type { Meta } from "@storybook/react";
import React from "react";
import { SliceCard, SliceCardProps } from "../components/SliceCard/SliceCard";
import { Offer } from "@duffel/api/types";

// Use a require because the fixture is not a module.
/* eslint-disable @typescript-eslint/no-var-requires */
const MOCK_OFFER: Offer = require("../fixtures/offers/off_1.json");

export default {
  title: "SliceCard",
  component: SliceCard,
} as Meta;

const defaultProps: SliceCardProps = {
  slice: MOCK_OFFER.slices[0],
  showFullDate: false,
  showFlightNumbers: false,
  hideFareBrand: false,
  highlightAll: false,
};

export const Default: React.FC = () => <SliceCard {...defaultProps} />;
