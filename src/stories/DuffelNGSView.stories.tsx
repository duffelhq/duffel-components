import type { Meta, StoryFn } from "@storybook/react";
import {
  DuffelNGSView,
  DuffelNGSViewProps,
} from "../components/DuffelNGSView/DuffelNGSView";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offerRequest = require("../fixtures/offer-requests/orq_0000Ab7taNqbK8y5YqW6Zk.json");

const offer = offerRequest.offers[0];
const cheapOffer = {
  ...offer,
  slices: [
    { ...offer.slices[0], ngs_shelf: 1, fare_brand_name: "Very Basic" },
    offer.slices[1],
  ],
  total_amount: "100",
};
const expensiveOffer = {
  ...offer,
  slices: [
    { ...offer.slices[0], ngs_shelf: 5, fare_brand_name: "Business" },
    { ...offer.slices[1], ngs_shelf: 5, fare_brand_name: "Business" },
  ],
  total_amount: "10000",
};
const alternativeCheapOffer = {
  ...offer,
  slices: [
    {
      ...offer.slices[0],
      segments: [
        {
          ...offer.slices[0].segments[0],
          marketing_carrier: { name: "British Airways", iata_code: "BA" },
        },
        ...offer.slices[0].segments.slice(1),
      ],
      ngs_shelf: 1,
      fare_brand_name: "Economy",
    },
    { ...offer.slices[1], ngs_shelf: 1, fare_brand_name: "Economy" },
  ],
  total_amount: "50",
};
const alternativeExpensiveOffer = {
  ...offer,
  slices: [
    {
      ...offer.slices[0],
      segments: [
        {
          ...offer.slices[0].segments[0],
          marketing_carrier: { name: "British Airways", iata_code: "BA" },
        },
        ...offer.slices[0].segments.slice(1),
      ],
      ngs_shelf: 5,
      fare_brand_name: "First",
    },
    { ...offer.slices[1], ngs_shelf: 5, fare_brand_name: "First" },
  ],
  total_amount: "20000",
};

export default {
  title: "DuffelNGSView",
  component: DuffelNGSView,
} as Meta;

const defaultProps: DuffelNGSViewProps = {
  offers: [
    offer,
    cheapOffer,
    expensiveOffer,
    alternativeCheapOffer,
    alternativeExpensiveOffer,
  ],
  onSelect: console.log,
};

export const Default: StoryFn<DuffelNGSViewProps> = () => (
  <DuffelNGSView {...defaultProps} />
);
