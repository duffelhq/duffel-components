import { DuffelCardForm } from "@components/DuffelCardForm/DuffelCardForm";
import { DuffelCardFormProps } from "@components/DuffelCardForm/lib/types";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "DuffelCardForm",
  component: DuffelCardForm,
} as Meta;

type DuffelCardFormStory = StoryObj<typeof DuffelCardForm>;

const defaultProps: DuffelCardFormProps = {
  clientKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IkVOQ1JZUFRFRF9UT0tFTiJ9.qP-zHSkMn-O9VGSj4wkh_A4VDOIrzpgRxh1xgLZ51rk",
  shouldUseLocalTokenProxy: true,
  actions: ["validate"],
  onValidateSuccess: console.log,
  onValidateFailure: console.error,
  onCreateCardForTemporaryUseSuccess: console.log,
  onCreateCardForTemporaryUseFailure: console.error,
};

export const Default: DuffelCardFormStory = { args: defaultProps };

export const WithFont: DuffelCardFormStory = {
  args: {
    ...defaultProps,
    styles: {
      fontFamily: `'Tangerine', serif`,
      stylesheetUrl: "https://fonts.googleapis.com/css?family=Tangerine",
    },
  },
};
