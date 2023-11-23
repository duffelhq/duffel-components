import type { Meta } from "@storybook/react";
import React from "react";
import {
  OfferSlice,
  OfferSliceProps,
} from "../components/OfferSlice/OfferSlice";
import { Airport, City, Offer, OfferSliceSegmentStop } from "@duffel/api/types";

// Use a require because the fixture is not a module.
/* eslint-disable @typescript-eslint/no-var-requires */
const MOCK_OFFER: Offer = require("../fixtures/offers/off_1.json");
const MOCK_SLICE = MOCK_OFFER.slices[0];
const MOCK_SEGMENTS = MOCK_SLICE.segments;
const MOCK_SEGMENT = MOCK_SEGMENTS[0];

const MOCK_CITY: City = {
  type: "city",
  iata_code: "PAR",
  iata_country_code: "FR",
  id: "cit_paris",
  name: "Paris",
  time_zone: "Europe/Paris",
  latitude: 49.0079,
  longitude: 2.5508,
  iata_city_code: "PAR",
  city_name: "Paris",
};
const MOCK_AIRPORT: Airport = {
  city: MOCK_CITY,
  city_name: "Paris",
  iata_code: "CDG",
  iata_country_code: "FR",
  iata_city_code: "PAR",
  icao_code: "LFPG",
  id: "air_paris_cdg",
  latitude: 49.0079,
  longitude: 2.5508,
  name: "Paris Charles de Gaulle Airport",
  time_zone: "Europe/Paris",
};

const MOCK_STOP: OfferSliceSegmentStop = {
  id: "stp_paris_cdg",
  departing_at: "2024-03-25T05:00:00",
  arriving_at: "2024-03-25T03:00:00",
  duration: "PT01h38m",
  airport: MOCK_AIRPORT,
};

export default {
  title: "OfferSlice",
  component: OfferSlice,
} as Meta;

const defaultProps: OfferSliceProps = {
  slice: MOCK_OFFER.slices[0],
  showFullDate: false,
  showFlightNumbers: false,
  hideFareBrand: false,
  highlightAll: false,
};

export const Default: React.FC = () => <OfferSlice {...defaultProps} />;

const prospWithStopOnFirstSegment: OfferSliceProps = {
  ...defaultProps,
  slice: {
    ...MOCK_SLICE,
    segments: [
      {
        ...MOCK_SEGMENT,
        stops: [MOCK_STOP],
      },
      ...MOCK_SEGMENTS.slice(1),
    ],
  },
};

export const WithStop: React.FC = () => (
  <OfferSlice {...prospWithStopOnFirstSegment} />
);
