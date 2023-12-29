import { Meta, StoryFn } from "@storybook/react";
import {
  StaysSummary,
  StaysSummaryProps,
} from "@components/Stays/StaysSummary";
import { StaysAccommodation } from "@duffel/api/types";

/* eslint-disable @typescript-eslint/no-var-requires */
const accommodation: StaysAccommodation = require("../fixtures/accommodation/acc_0000AWr2VsUNIF1Vl91xg0.json");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
  title: "StaysSummary",
  component: StaysSummary,
} as Meta;

const Template: StoryFn<StaysSummaryProps> = (args) => (
  <div style={{ maxWidth: "400px" }}>
    <StaysSummary {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    accommodation: accommodation,
    checkInDate: new Date("2023-04-28"),
    checkOutDate: new Date("2023-05-04"),
    numRooms: 2,
    supportedLoyaltyProgramme: "duffel_hotel_group_rewards",
    loyaltyProgrammeAccountNumber: "12345",
    accommodationSpecialRequests: "I would like a room with a view",
  },
};

export const WithNoPhoto = {
  render: Template,

  args: {
    accommodation: { ...accommodation, photos: [] },
    checkInDate: new Date("2023-04-28"),
    checkOutDate: new Date("2023-05-04"),
    numRooms: 1,
  },
};
