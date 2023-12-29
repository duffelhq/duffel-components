import { Meta, StoryFn } from "@storybook/react";
import {
  StaysRoomRateCard,
  StaysRoomRateCardProps,
} from "@components/Stays/StaysRoomRateCard";
import { useState } from "react";
import { StaysAccommodation } from "@duffel/api/types";

/* eslint-disable @typescript-eslint/no-var-requires */
const accommodation: StaysAccommodation = require("../fixtures/accommodation/acc_0000AWr2VsUNIF1Vl91xg0.json");
/* eslint-enable @typescript-eslint/no-var-requires */

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
    rate: accommodation.rooms[0].rates[0],
    numberOfNights: 3,
  },
};

export const Variant = {
  render: Template,

  args: {
    rate: { ...accommodation.rooms[0].rates[1] },
    numberOfNights: 3,
    searchNumberOfRooms: 2,
    selected: true,
  },
};
