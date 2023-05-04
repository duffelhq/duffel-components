import { DuffelAncillaries } from "@components/DuffelAncillaries";
import type { Meta, StoryObj } from "@storybook/react";
// Use a require because the fixture is not a module.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_1.json");

export default {
  title: "DuffelAncillaries",
  component: DuffelAncillaries,
} as Meta;

type Story = StoryObj<typeof DuffelAncillaries>;

const defaultProps = {
  onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  passengers: [],
  seat_maps: [],
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
