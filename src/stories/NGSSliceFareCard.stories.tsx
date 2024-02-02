import type { Meta } from "@storybook/react";
import { NGSSliceFareCard } from "../components/DuffelNGSView/NGSSliceFareCard";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const offerRequest = require("../fixtures/offer-requests/orq_0000Ab7taNqbK8y5YqW6Zk.json");
const offer = offerRequest.offers[0];

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
