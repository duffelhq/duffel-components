import type { Meta } from "@storybook/react";
import { NGSSliceFareCard } from "../components/DuffelNGSView/NGSSliceFareCard";

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

export const FullList: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-evenly",
      width: "600px",
    }}
  >
    <NGSSliceFareCard offer={offer} sliceIndex={0} onSelect={console.log} />
    <NGSSliceFareCard
      offer={{
        ...offer,
        total_amount: 500,
        slices: [
          {
            ...offer.slices[0],
            fare_brand_name: "Really long fare brand name",
          },
          {
            ...offer.slices[1],
            fare_brand_name: "Really long fare brand name",
            conditions: {
              refund_before_departure: {
                allowed: true,
                penalty_amount: 100,
                penalty_currency: "USD",
              },
              change_before_departure: {
                allowed: true,
                penalty_amount: 10,
                penalty_currency: "USD",
              },
              priority_check_in: true,
              priority_boarding: true,
              advance_seat_selection: true,
            },

            segments: [
              {
                ...offer.slices[1].segments[0],
                passengers: [
                  {
                    ...offer.slices[1].segments[0].passengers[0],
                    baggages: [
                      { quantity: 0, type: "checked" },
                      { quantity: 1, type: "carry_on" },
                    ],
                  },
                  ...offer.slices[1].segments[0].passengers.slice(1),
                ],
              },
              ...offer.slices[1].segments.slice(1),
            ],
          },
        ],
      }}
      sliceIndex={1}
      onSelect={console.log}
    />
    <NGSSliceFareCard
      offer={{
        ...offer,
        total_amount: 500,
        slices: [
          {
            ...offer.slices[0],
            conditions: {
              change_before_departure: null,
              priority_boarding: null,
              priority_check_in: null,
              advance_seat_selection: null,
            },
            fare_brand_name: "premium_economy",
          },
          {
            ...offer.slices[1],
            conditions: {
              change_before_departure: null,
              priority_boarding: null,
              priority_check_in: null,
              advance_seat_selection: null,
            },
            fare_brand_name: "premium_economy",
          },
        ],
      }}
      sliceIndex={1}
      onSelect={console.log}
    />
  </div>
);
