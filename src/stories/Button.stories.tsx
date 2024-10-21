import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "../components/shared/Button";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="duffel-components">
        <Story />
      </div>
    ),
  ],
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

const AccentColorWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={
      {
        "--ACCENT": "29, 78, 216",
      } as any
    }
  >
    {children}
  </div>
);

export const WithAccentColorSet: StoryFn<ButtonProps> = () => (
  <AccentColorWrapper>
    <Button {...defaultProps} />
  </AccentColorWrapper>
);

const WhiteAccentColorWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={
      {
        "--ACCENT": "255, 255, 255",
        "--SECONDARY": "black",
        "--TERTIARY": "grey",
      } as any
    }
  >
    {children}
  </div>
);

export const WithWhiteAccentColorSet: StoryFn<ButtonProps> = () => (
  <WhiteAccentColorWrapper>
    <Button {...defaultProps} />
  </WhiteAccentColorWrapper>
);
