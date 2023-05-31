import { Button, ButtonProps } from "@components/Button";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as Meta;

type ButtonStory = StoryObj<typeof Button>;

const defaultProps: ButtonProps = {
  children: "Click me",
  onClick: () => 0,
};

export const Default: ButtonStory = { args: defaultProps };

export const Disabled: ButtonStory = {
  args: { ...defaultProps, disabled: true },
};

export const WithIconBefore: ButtonStory = {
  args: { ...defaultProps, iconBefore: "autorenew" },
};

export const WithOutlinedVariant: ButtonStory = {
  args: { ...defaultProps, variant: "outlined" },
};

export const DisabledWithOutlinedVariant: ButtonStory = {
  args: { ...defaultProps, variant: "outlined", disabled: true },
};

export const WithDestructiveVariant: ButtonStory = {
  args: {
    ...defaultProps,
    children: "Click to delete something important",
    variant: "destructive",
  },
};

export const WithSize32: ButtonStory = {
  args: { ...defaultProps, size: 32, iconBefore: "autorenew" },
};

export const WithSize48: ButtonStory = {
  args: { ...defaultProps, size: 48, iconBefore: "autorenew" },
};

export const WithAccentColorSet: StoryFn<ButtonProps> = () => (
  <div
    style={
      {
        "--ACCENT": "29, 78, 216",
      } as any
    }
  >
    <Button {...defaultProps} />
  </div>
);
