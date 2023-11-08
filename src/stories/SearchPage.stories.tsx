import type { Meta, StoryObj } from "@storybook/react";
import {
  SearchPage,
  SearchPageProps,
} from "../components/SearchPage/SearchPage";

export default {
  title: "SearchPage",
  component: SearchPage,
} as Meta;

type SearchPageStory = StoryObj<typeof SearchPage>;

const defaultProps: SearchPageProps = {
  data: {
    suggestions: ["London", "LHR", "LTN", "Paris"],
  },
  getSuggestions: (value) => {
    // eslint-disable-next-line no-restricted-syntax
    console.log("value", value);
  },
};

export const Default: SearchPageStory = {
  args: defaultProps,
};

export const Empty: SearchPageStory = {
  args: { data: undefined },
};
