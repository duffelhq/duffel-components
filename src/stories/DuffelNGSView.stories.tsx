import type { Meta, StoryFn } from "@storybook/react";
import {
  DuffelNGSView,
  DuffelNGSViewProps,
} from "../components/DuffelNGSView/DuffelNGSView";
import { offerRequestWithDuplicates } from "src/fixtures/offer-requests/orq_duplicates";

/* eslint-disable @typescript-eslint/no-var-requires */
const offerRequest = require("../fixtures/offer-requests/orq_0000Ab7taNqbK8y5YqW6Zk.json");
const largeOfferRequest = require("../fixtures/offer-requests/orq_0000AgDHjHoX1SDBo07hdQ.json");
/* eslint-enable @typescript-eslint/no-var-requires */

const offer = offerRequest.offers[0];
const cheapOffer = {
  ...offer,
  slices: [
    {
      ...offer.slices[0],
      ngs_shelf: 1,
      fare_brand_name: "Very Basic Long Fare Brand Name",
    },
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
const mediumOffer = {
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
      ngs_shelf: 3,
    },
    offer.slices[1],
  ],
  total_amount: "500",
};
const alternativeMediumOffer = {
  ...offer,
  slices: [
    {
      ...offer.slices[0],
      segments: [
        {
          ...offer.slices[0].segments[0],
          marketing_carrier: { name: "British Airways", iata_code: "BA" },
          operating_carrier: { name: "British Airways", iata_code: "BA" },
          marketing_carrier_flight_number: "BA456",
        },
        ...offer.slices[0].segments.slice(1),
      ],
      ngs_shelf: 3,
    },
    offer.slices[1],
  ],
  total_amount: "400",
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
      mediumOffer,
      alternativeMediumOffer,
      expensiveOffer,
      alternativeCheapOffer,
      alternativeExpensiveOffer,
    ],
  },
  onSelect: console.log,
};

// Container just to show the boundary of the component inside the dashboard
const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ width: "1000px", height: "100vh", border: `dashed 1px lightgrey` }}
  >
    {children}
  </div>
);

export const Default: StoryFn<DuffelNGSViewProps> = () => (
  <Container>
    <DuffelNGSView {...defaultProps} />
  </Container>
);

// Example from https://www.notion.so/duffel/NGS-Technical-Scoping-26df8e8fb8db40e19bd661b748810622?pvs=4#b4db506e7de24815afe3ad4ca13bed89
const deduplicatedProps: DuffelNGSViewProps = {
  offerRequest: offerRequestWithDuplicates,
  onSelect: console.log,
};

export const Deduplicated: StoryFn<DuffelNGSViewProps> = () => (
  <Container>
    <DuffelNGSView {...deduplicatedProps} />
  </Container>
);

export const Large: StoryFn<DuffelNGSViewProps> = () => (
  <Container>
    <DuffelNGSView offerRequest={largeOfferRequest} onSelect={console.log} />
  </Container>
);

// The compiled story got too big with these examples and was causing CI to fail.
// If you want to work with it, just uncomment the code below and run the storybook locally.

// const cabinSelectionBugFix = require("../fixtures/offer-requests/orq_0000AhRu3sGYT8z1tTSdqN.json");
// export const CabinSelectionBugfix: StoryFn<DuffelNGSViewProps> = () => (
//   <Container>
//     <DuffelNGSView offerRequest={cabinSelectionBugFix} onSelect={console.log} />
//   </Container>
// );

// const mixedCabin = require("../fixtures/offer-requests/orq_0000AhRzwLeef80fcOTmHA.json");
// export const MixedCabin: StoryFn<DuffelNGSViewProps> = () => (
//   <Container>
//     <DuffelNGSView offerRequest={mixedCabin} onSelect={console.log} />
//   </Container>
// );
