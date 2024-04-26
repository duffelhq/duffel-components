import {
  AirlineSelector,
  AirlineSelectorProps,
} from "@components/DuffelNGSView/AirlineSelector";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

export default {
  title: "AirlineSelector",
  component: AirlineSelector,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

const airlines = [
  {
    iata_code: "AA",
    name: "American Airlines",
  },
  {
    iata_code: "ZZ",
    name: "Duffel Airways",
  },
  {
    iata_code: "B6",
    name: "JetBlue Airways",
  },
  {
    iata_code: "WN",
    name: "Southwest Airlines",
  },
];

export const Default = () => {
  const [selectedAirlines, onSetSelectedAirlines] = React.useState(airlines);

  return (
    <div style={{ width: "100%", padding: "20px", height: "100%" }}>
      <AirlineSelector
        options={airlines}
        selected={selectedAirlines}
        onChange={(changed) => {
          onSetSelectedAirlines(changed);
          console.log({ changed });
        }}
      />
    </div>
  );
};
