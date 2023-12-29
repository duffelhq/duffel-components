import { Meta, StoryFn } from "@storybook/react";
import {
  StaysAmenities,
  StaysAmenitiesProps,
} from "@components/Stays/StaysAmenities";
import { StaysAccommodation } from "@duffel/api/types";

/* eslint-disable @typescript-eslint/no-var-requires */
const accommodation: StaysAccommodation = require("../fixtures/accommodation/acc_0000AWr2VsUNIF1Vl91xg0.json");
/* eslint-enable @typescript-eslint/no-var-requires */

export default {
  title: "StaysAmenities",
  component: StaysAmenities,
} as Meta;

const Template: StoryFn<StaysAmenitiesProps> = (args) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridRowGap: "8px",
    }}
  >
    <StaysAmenities {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    amenities: accommodation.amenities,
  },
};
