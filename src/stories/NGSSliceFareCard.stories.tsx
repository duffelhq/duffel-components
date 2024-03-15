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

export const FullList: React.FC = () => {
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
        onSelect={console.log}
      />
      <NGSSliceFareCard offer={offer} sliceIndex={1} onSelect={console.log} />
    </div>
  );
};
