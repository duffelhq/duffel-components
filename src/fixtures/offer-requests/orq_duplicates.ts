import { NGSShelf } from "@components/DuffelNGSView/lib";
import { OfferSlice } from "@duffel/api/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offerRequest = require("./orq_0000Ab7taNqbK8y5YqW6Zk.json");
const offer = offerRequest.offers[0];

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

export const offerRequestWithDuplicates = {
  ...offerRequest,
  offers: duplicateOffers,
};
