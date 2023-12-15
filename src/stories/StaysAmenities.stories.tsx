import { Meta, StoryFn } from "@storybook/react";
import {
  StaysAmenities,
  StaysAmenitiesProps,
} from "@components/Stays/StaysAmenities";
import { mockAccommodation } from "src/fixtures/accommodation/mock_accommodation";

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
    amenities: mockAccommodation.amenities,
  },
};
