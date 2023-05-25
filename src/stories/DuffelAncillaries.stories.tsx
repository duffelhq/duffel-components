import { DuffelAncillaries } from "@components/DuffelAncillaries";
import type { Meta, StoryObj } from "@storybook/react";
// Use a require because the fixture is not a module.
/* eslint-disable @typescript-eslint/no-var-requires */
const offer = require("../fixtures/offers/off_1.json");
const seatMaps = require("../fixtures/seat-maps/off_1.json");
const passengers = require("../fixtures/passengers/mock_passengers.json");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
  title: "DuffelAncillaries",
  component: DuffelAncillaries,
} as Meta;

type Story = StoryObj<typeof DuffelAncillaries>;

const defaultProps = {
  onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  passengers: passengers,
  seat_maps: seatMaps,
};

export const BagsAndSeats: Story = {
  args: {
    services: ["bags", "seats"],
    offer: offer,
    ...defaultProps,
  },
};

export const JustBags: Story = {
  args: {
    services: ["bags"],
    offer: offer,
    ...defaultProps,
  },
};

export const JustSeats: Story = {
  args: {
    services: ["seats"],
    offer: offer,
    ...defaultProps,
  },
};

export const ExpiredOffer: Story = {
  args: {
    services: ["bags", "seats"],
    offer: { ...offer, expires_at: "2023-04-19T00:00:00Z" },
    ...defaultProps,
  },
};

const fiftyPercentMarkup = (amount: number, currency: string) => ({
  amount: amount * 1.5,
  currency,
});

export const SimpleMarkup: Story = {
  args: {
    priceFormatters: {
      bags: fiftyPercentMarkup,
      seats: fiftyPercentMarkup,
    },
    services: ["bags", "seats"],
    offer: offer,
    ...defaultProps,
  },
};

const customCurrencyMarkup = () => ({
  amount: 100,
  currency: "Duffel points",
});

export const MarkupWithCustomCurrency: Story = {
  args: {
    priceFormatters: {
      bags: customCurrencyMarkup,
      seats: customCurrencyMarkup,
    },
    services: ["bags", "seats"],
    offer: offer,
    ...defaultProps,
  },
};
