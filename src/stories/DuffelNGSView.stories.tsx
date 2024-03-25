import type { Meta, StoryFn } from "@storybook/react";
import {
  DuffelNGSView,
  DuffelNGSViewProps,
} from "../components/DuffelNGSView/DuffelNGSView";
import { OfferSlice } from "@duffel/api/types";
import { NGSShelf } from "@components/DuffelNGSView/lib";

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
          marketing_carrier_flight_number: "BA123",
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
          marketing_carrier_flight_number: "BA123",
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
  offerRequest: {
    ...offerRequest,
    offers: [
      offer,
      cheapOffer,
      expensiveOffer,
      alternativeCheapOffer,
      alternativeExpensiveOffer,
    ],
  },
  onSelect: console.log,
};

export const Default: StoryFn<DuffelNGSViewProps> = () => (
  <DuffelNGSView {...defaultProps} />
);

const makeSlice = (
  offerIndex: number,
  sliceIndex: number,
  ngs_shelf: NGSShelf,
  marketing_carrier_flight_number: string,
) => ({
  ...offerRequest.offers[offerIndex].slices[sliceIndex],
  ngs_shelf,
  segments: [
    {
      ...offerRequest.offers[offerIndex].slices[sliceIndex].segments[0],
      marketing_carrier_flight_number: marketing_carrier_flight_number,
    },
    ...offerRequest.offers[offerIndex].slices[sliceIndex].segments.slice(1),
  ],
});
const getSliceWithFareBrand = (slice: OfferSlice, fareBrand: string) => ({
  ...slice,
  fare_brand_name: fareBrand,
});

const ngsShelf = 1;
const fareBrand1 = "Basic";
const fareBrand2 = "Standard";
const sliceA1 = makeSlice(0, 0, ngsShelf, "A1");
const sliceA2 = makeSlice(1, 0, ngsShelf, "A2");
const sliceB1 = makeSlice(0, 1, ngsShelf, "B1");
const sliceB2 = makeSlice(1, 1, ngsShelf, "B2");
const sliceB3 = makeSlice(2, 1, ngsShelf, "B3");
const A1F1 = getSliceWithFareBrand(sliceA1, fareBrand1);
const A1F2 = getSliceWithFareBrand(sliceA1, fareBrand2);
const A2F1 = getSliceWithFareBrand(sliceA2, fareBrand1);
const A2F2 = getSliceWithFareBrand(sliceA2, fareBrand2);
const B1F1 = getSliceWithFareBrand(sliceB1, fareBrand1);
const B1F2 = getSliceWithFareBrand(sliceB1, fareBrand2);
const B2F1 = getSliceWithFareBrand(sliceB2, fareBrand1);
const B2F2 = getSliceWithFareBrand(sliceB2, fareBrand2);
const B3F1 = getSliceWithFareBrand(sliceB3, fareBrand1);
const B3F2 = getSliceWithFareBrand(sliceB3, fareBrand2);
const offer1 = { ...offer, slices: [A1F1, B1F1], total_amount: "10" };
const offer2 = { ...offer, slices: [A1F2, B1F2], total_amount: "20" };
const offer3 = { ...offer, slices: [A1F1, B2F1], total_amount: "30" };
const offer4 = { ...offer, slices: [A1F2, B2F2], total_amount: "40" };
const offer5 = { ...offer, slices: [A2F1, B1F1], total_amount: "50" };
const offer6 = { ...offer, slices: [A2F2, B1F2], total_amount: "60" };
const offer7 = { ...offer, slices: [A2F1, B2F1], total_amount: "70" };
const offer8 = { ...offer, slices: [A2F2, B2F2], total_amount: "80" };
const offer9 = { ...offer, slices: [A1F1, B3F1], total_amount: "90" };
const offer10 = { ...offer, slices: [A1F2, B3F2], total_amount: "100" };

// Example from https://www.notion.so/duffel/NGS-Technical-Scoping-26df8e8fb8db40e19bd661b748810622?pvs=4#b4db506e7de24815afe3ad4ca13bed89
// eslint-disable-next-line storybook/prefer-pascal-case
export const duplicateOffers = [
  // TODO export from somewhere else as it's not a story
  offer1,
  offer2,
  offer3,
  offer4,
  offer5,
  offer6,
  offer7,
  offer8,
  offer9,
  offer10,
];

// Example from https://www.notion.so/duffel/NGS-Technical-Scoping-26df8e8fb8db40e19bd661b748810622?pvs=4#b4db506e7de24815afe3ad4ca13bed89
const deduplicatedProps: DuffelNGSViewProps = {
  offerRequest: { ...offerRequest, offers: duplicateOffers },
  onSelect: console.log,
};

export const Deduplicated: StoryFn<DuffelNGSViewProps> = () => (
  <DuffelNGSView {...deduplicatedProps} />
);
