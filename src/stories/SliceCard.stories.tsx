import type { Meta } from "@storybook/react";
import React from "react";
import { SliceCard, SliceCardProps } from "../components/SliceCard/SliceCard";

export default {
  title: "SliceCard",
  component: SliceCard,
} as Meta;

const defaultProps: SliceCardProps = {};

export const Default: React.FC = () => <SliceCard {...defaultProps} />;
