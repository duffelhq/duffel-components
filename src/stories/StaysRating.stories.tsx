import { Meta, StoryFn } from "@storybook/react";
import { StaysRating, StaysRatingProps } from "@components/Stays/StaysRating";

export default {
  title: "StaysRating",
  component: StaysRating,
} as Meta;

const Template: StoryFn<StaysRatingProps> = (args) => (
  <div style={{ maxWidth: "400px" }}>
    <StaysRating {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    rating: 3,
  },
};

export const Small = {
  render: Template,

  args: {
    rating: 4,
    small: true,
  },
};
