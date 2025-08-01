import { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import {
  TimelineItem,
  TimelineItemProps,
} from "../components/Stays/StaysCancellationTimeline/TimelineItem";
import { HSpace } from "@components/shared/HSpace";

export default {
  title: "Components/StaysCancellationTimeline/TimelineItem",
  component: TimelineItem,
} as Meta;

export const Default = {
  args: {},
};

export const WithTextAndColors = {
  args: {
    label: "Flight to LTN",
    description: "£237.68",
    dotColor: "GREY-800",
    lineColorLeft: "PINK-700",
    lineColorRight: "GREEN-700",
  },
};

export const WithTextNoDot = {
  args: {
    label: "Flight to LTN",
    description: "£237.68",
    dot: false,
    lineColorLeft: "YELLOW-700",
    lineColorRight: "YELLOW-700",
  },
};

const MultipleTemplate: StoryFn<{ propsList: TimelineItemProps[] }> = ({
  propsList,
}) => (
  <HSpace space={0}>
    {propsList.map((props, index) => (
      <TimelineItem key={index} {...props} />
    ))}
  </HSpace>
);

export const TextOnDots = {
  render: MultipleTemplate,

  args: {
    propsList: [
      {
        dotColor: "GREY-800",
        lineColorRight: "YELLOW-700",
        label: "Today",
      },
      {
        dotColor: "GREEN-700",
        lineColorLeft: "YELLOW-700",
        lineColorRight: "GREEN-700",
        label: "Tomorrow",
      },
    ],
  },
};

export const TextBetweenDots = {
  render: MultipleTemplate,

  args: {
    propsList: [
      {
        dotColor: "GREY-800",
        lineColorRight: "GREEN-700",
        size: "small",
      },
      {
        dot: false,
        label: "Cancel for free",
        description: "You will be refunded",
        lineColorLeft: "GREEN-700",
        lineColorRight: "GREEN-700",
      },
      {
        dotColor: "GREEN-700",
        lineColorLeft: "GREEN-700",
        size: "small",
      },
    ],
  },
};
