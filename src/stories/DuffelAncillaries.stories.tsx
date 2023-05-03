import { DuffelAncillaries } from "@components/DuffelAncillaries";
import type { Meta, StoryObj } from "@storybook/react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_0000AUde3KwTztSRK1cznH.json");

export default {
  title: "DuffelAncillaries",
  component: DuffelAncillaries,
} as Meta;

type Story = StoryObj<typeof DuffelAncillaries>;

const expiredOffer = { ...offer, expires_at: "2023-04-19T00:00:00Z" };

export const ExpiredOffer: Story = {
  args: {
    offer: expiredOffer,
    onPayloadReady: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    passengers: [],
    seat_maps: [],
  },
};
