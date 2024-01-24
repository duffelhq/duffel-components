import type { Meta } from "@storybook/react";
import { NGSSliceFareCard } from "../components/DuffelNGSView/NGSSliceFareCard";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offer = require("../fixtures/offers/off_0000Adw9MD7yDHXIXxdjfG.json");

export default {
  title: "NGSSliceFareCard",
  component: NGSSliceFareCard,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
} as Meta;

// TODO: make this example more realistic once we have data in the API?
export const FullList: React.FC = () => {
  const [selected, setSelected] = React.useState(0);
  const compareToAmount = 500;
  console.log(selected);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        width: "600px",
        height: "400px",
      }}
    >
      <NGSSliceFareCard
        offer={{ ...offer, total_amount: compareToAmount }}
        sliceIndex={0}
        compareToAmount={offer.total_amount}
        selected={selected === 0}
        onSelect={() => setSelected(0)}
      />
      <NGSSliceFareCard
        offer={offer}
        sliceIndex={1}
        compareToAmount={compareToAmount}
        selected={selected === 1}
        onSelect={() => setSelected(1)}
      />
    </div>
  );
};
