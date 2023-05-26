import { IconButton, IconButtonProps } from "@components/IconButton";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "IconButton",
  component: IconButton,
} as Meta;

type IconButtonStory = StoryObj<typeof IconButton>;

const defaultProps: IconButtonProps = {
  title: "Click me",
  icon: "autorenew",
  onClick: () => 0,
};

export const Default: IconButtonStory = { args: defaultProps };

export const WithOutlinedVariant: IconButtonStory = {
  args: { ...defaultProps, variant: "outlined" },
};

export const DisabledWithOutlinedVariant: IconButtonStory = {
  args: { ...defaultProps, variant: "outlined", disabled: true },
};
