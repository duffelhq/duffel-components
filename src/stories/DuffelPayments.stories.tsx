import type { Meta, StoryObj } from "@storybook/react";
import {
  DuffelPayments,
  DuffelPaymentsProps,
} from "../components/DuffelPayments/DuffelPayments";

export default {
  title: "DuffelPayments",
  component: DuffelPayments,
} as Meta;

type DuffelPaymentsStory = StoryObj<typeof DuffelPayments>;

const defaultProps: DuffelPaymentsProps = {
  paymentIntentClientToken:
    "eyJjbGllbnRfc2VjcmV0IjoicGlfM0psczlVQWcySmhFeTh2WTBSTm1MU0JkX3NlY3JldF9QUW9yZXNuU3laeWJadGRiejZwNzBCbUdPIiwicHVibGlzaGFibGVfa2V5IjoicGtfdGVzdF9EQUJLY0E2Vzh6OTc0cTdPSWY0YmJ2MVQwMEpwRmMyOUpWIn0=",
  onSuccessfulPayment: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onFailedPayment: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

export const Default: DuffelPaymentsStory = {
  args: defaultProps,
};

export const WithCustomStyles: DuffelPaymentsStory = {
  args: {
    ...defaultProps,
    styles: {
      accentColor: "29, 78, 216",
      fontFamily: "monospace",
      buttonCornerRadius: "15px",
    },
  },
};
