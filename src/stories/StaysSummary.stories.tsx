import { Meta, StoryFn } from "@storybook/react";
import { mockAccommodation } from "../fixtures/accommodation/mock_accommodation";
import {
  StaysSummary,
  StaysSummaryProps,
} from "@components/Stays/StaysSummary";

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
    accommodation: mockAccommodation,
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
    accommodation: { ...mockAccommodation, photos: [] },
    checkInDate: new Date("2023-04-28"),
    checkOutDate: new Date("2023-05-04"),
    numRooms: 1,
  },
};
