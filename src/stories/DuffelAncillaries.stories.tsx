import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { DuffelAncillaries } from "../components/DuffelAncillaries/DuffelAncillaries";
import mockPassengers from "../fixtures/passengers/mock_passengers";
import { DuffelAncillariesPropsWithOffersAndSeatMaps } from "../types/DuffelAncillariesProps";
import { Offer, SeatMap } from "@duffel/api/types";

// Use a require because the fixture is not a module.
/* eslint-disable @typescript-eslint/no-var-requires */
const offer: Offer = require("../fixtures/offers/off_1.json");
const seat_maps: SeatMap[] = require("../fixtures/seat-maps/off_1.json");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
  title: "DuffelAncillaries",
  component: DuffelAncillaries,
} as Meta;

type DuffelAncillariesStory = StoryObj<typeof DuffelAncillaries>;

const defaultProps: Pick<
  DuffelAncillariesPropsWithOffersAndSeatMaps,
  "onPayloadReady" | "passengers" | "offer" | "seat_maps" | "services" | "debug"
> = {
  onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  offer,
  seat_maps,
  passengers: mockPassengers,
  services: ["bags", "seats", "cancel_for_any_reason"],
  debug: true,
};

export const AllServices: DuffelAncillariesStory = {
  args: defaultProps,
};

export const JustBags: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    services: ["bags"],
  },
};

export const JustSeats: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    services: ["seats"],
  },
};

export const JustCFAR: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    services: ["cancel_for_any_reason"],
  },
};

export const ExpiredOffer: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    offer: { ...offer, expires_at: "2023-04-19T00:00:00Z" },
  },
};

export const OneWayOnePassengerOffer: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    offer: {
      ...offer,
      slices: [
        {
          ...offer.slices[0],
          segments: [
            {
              ...offer.slices[0].segments[0],
              passengers: [offer.slices[0].segments[0].passengers[0]],
            },
          ],
        },
      ],
      passengers: [offer.passengers[0]],
      available_services: [offer.available_services[0]],
    },
  },
};

export const WithCustomStyles: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    styles: {
      accentColor: "29, 78, 216",
      fontFamily: "monospace",
      buttonCornerRadius: "15px",
    },
  },
};

export const Markup: DuffelAncillariesStory = {
  args: {
    markup: {
      bags: {
        rate: 0.1,
        amount: 1,
      },
      seats: {
        rate: 0.2,
        amount: 2,
      },
      cancel_for_any_reason: {
        rate: 0.3,
        amount: 3,
      },
    },
    ...defaultProps,
  },
};

const fiftyPercentMarkup = (amount: number) => ({
  amount: amount * 1.5,
});

export const MarkupUsingPriceFormatters: DuffelAncillariesStory = {
  args: {
    ...defaultProps,
    priceFormatters: {
      bags: fiftyPercentMarkup,
      seats: fiftyPercentMarkup,
      cancel_for_any_reason: fiftyPercentMarkup,
    },
  },
};

const customCurrencyMarkup = () => ({
  amount: 100,
  currency: "Duffel points",
});

export const MarkupUsingPriceFormattersWithCustomCurrency: DuffelAncillariesStory =
  {
    args: {
      ...defaultProps,
      priceFormatters: {
        bags: customCurrencyMarkup,
        seats: customCurrencyMarkup,
        cancel_for_any_reason: customCurrencyMarkup,
      },
    },
  };

export const WithAccentColorSet: StoryFn<
  DuffelAncillariesPropsWithOffersAndSeatMaps
> = () => (
  <DuffelAncillaries
    {...defaultProps}
    styles={{ accentColor: "29, 78, 216" }}
  />
);

export const WithWhiteAccentColorSet: StoryFn<
  DuffelAncillariesPropsWithOffersAndSeatMaps
> = () => (
  <DuffelAncillaries
    {...defaultProps}
    styles={{ accentColor: "255, 255, 255" }}
  />
);
