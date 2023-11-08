import type { Meta, StoryObj } from "@storybook/react";
import {
  ResultsPage,
  ResultsPageProps,
} from "../components/ResultsPage/ResultsPage";

export default {
  title: "ResultsPage",
  component: ResultsPage,
} as Meta;

type ResultsPageStory = StoryObj<typeof ResultsPage>;

const defaultProps: ResultsPageProps = {
  data: {
    itineraries: [
      { id: "off_0000AbQaBbZEZWlbp7f7EF_0" },
      { id: "off_0000AbQaBbZEZWlbp7f7EF_1" },
      { id: "off_789" },
    ],
  },
  onSelect: (id) => {
    // eslint-disable-next-line no-restricted-syntax
    console.log("finished", id);
  },
};

export const Default: ResultsPageStory = {
  args: defaultProps,
};

export const Empty: ResultsPageStory = {
  args: { data: undefined },
};
