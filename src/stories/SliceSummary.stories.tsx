import { SliceSummary } from "@components/DuffelNGSView/SliceSummary";
import { Airport, City, Offer, OfferSliceSegmentStop } from "@duffel/api/types";
import type { Meta } from "@storybook/react";
import React from "react";

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
  title: "SliceSummary",
  component: SliceSummary,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: React.FC = () => (
  <SliceSummary slice={MOCK_OFFER.slices[0]} />
);

export const WithStop: React.FC = () => (
  <SliceSummary
    slice={{
      ...MOCK_SLICE,
      segments: [
        {
          ...MOCK_SEGMENT,
          stops: [MOCK_STOP],
        },
      ],
    }}
  />
);

export const WithStopAnd2Segments: React.FC = () => (
  <SliceSummary
    slice={{
      ...MOCK_SLICE,
      segments: [
        MOCK_SEGMENT,
        {
          ...{ ...MOCK_SEGMENT, origin: { ...MOCK_AIRPORT, iata_code: "EWR" } },
          stops: [MOCK_STOP],
        },
      ],
    }}
  />
);