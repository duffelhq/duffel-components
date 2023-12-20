import { Meta, StoryFn } from "@storybook/react";
import {
  StaysRoomRateCard,
  StaysRoomRateCardProps,
} from "@components/Stays/StaysRoomRateCard";
import { mockAccommodation } from "src/fixtures/accommodation/mock_accommodation";
import { useState } from "react";

export default {
  title: "StaysRoomRateCard",
  component: StaysRoomRateCard,
} as Meta;

const Template: StoryFn<StaysRoomRateCardProps> = (args) => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ maxWidth: "400px" }}>
      <StaysRoomRateCard
        {...args}
        selected={selected}
        onSelectRate={() => setSelected(!selected)}
      />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    rate: mockAccommodation.rooms[0].rates[0],
    numberOfNights: 3,
  },
};

export const Variant = {
  render: Template,

  args: {
    rate: { ...mockAccommodation.rooms[0].rates[1] },
    numberOfNights: 3,
    showPotentialCommission: true,
    searchNumberOfRooms: 2,
    selected: true,
  },
};
