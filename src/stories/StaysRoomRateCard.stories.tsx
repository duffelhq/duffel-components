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

const Template: StoryFn<{ roomRates: StaysRoomRateCardProps[] }> = (args) => {
  const { roomRates } = args;

  const [selectedRate, setSelectedRate] = useState(roomRates[0].rate.id);

  return (
    <div style={{ display: "flex", gap: "16px", height: "300px" }}>
      {roomRates.map((roomRate) => (
        <StaysRoomRateCard
          {...roomRate}
          key={roomRate.rate.id}
          selected={roomRate.rate.id === selectedRate}
          onSelectRate={() => setSelectedRate(roomRate.rate.id)}
        />
      ))}
    </div>
  );
};

export const RateWithMinimalInformation = {
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

export const RateWithCompleteInformation = {
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

export const RatesCrossComparison = {
  render: Template,

  args: {
    roomRates: [
      ...RateWithMinimalInformation.args.roomRates,
      ...RateWithCompleteInformation.args.roomRates,
    ],
  },
};
