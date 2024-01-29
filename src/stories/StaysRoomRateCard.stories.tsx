import { Meta, StoryFn } from "@storybook/react";
import {
  StaysRoomRateCard,
  StaysRoomRateCardProps,
} from "@components/Stays/StaysRoomRateCard";
import { StaysAccommodation } from "@duffel/api/types";

/* eslint-disable @typescript-eslint/no-var-requires */
const accommodation: StaysAccommodation = require("../fixtures/accommodation/acc_0000AWr2VsUNIF1Vl91xg0.json");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
  title: "StaysRoomRateCard",
  component: StaysRoomRateCard,
} as Meta;

const Template: StoryFn<{ roomRates: StaysRoomRateCardProps[] }> = (args) => {
  const { roomRates } = args;

  return (
    <div style={{ display: "flex", gap: "16px", height: "300px" }}>
      {roomRates.map((roomRate) => (
        <StaysRoomRateCard {...roomRate} key={roomRate.rate.id} />
      ))}
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    roomRates: [
      {
        rate: accommodation.rooms[0].rates[0],
        numberOfNights: 3,
      },
    ],
  },
};

export const Variant = {
  render: Template,

  args: {
    roomRates: [
      {
        rate: accommodation.rooms[0].rates[1],
        numberOfNights: 3,
        searchNumberOfRooms: 2,
      },
    ],
  },
};

export const CrossComparison = {
  render: Template,

  args: {
    roomRates: [...Default.args.roomRates, ...Variant.args.roomRates],
  },
};
