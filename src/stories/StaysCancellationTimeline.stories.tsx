import { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import {
  StaysCancellationTimeline,
  StaysCancellationTimelineProps,
} from "../components/Stays/StaysCancellationTimeline/StaysCancellationTimeline";

export default {
  title: "StaysCancellationTimeline",
  component: StaysCancellationTimeline,
} as Meta;

const Template: StoryFn<StaysCancellationTimelineProps> = (props) => (
  <div style={{ width: "800px" }}>
    <StaysCancellationTimeline {...props} />
  </div>
);

export const FullAndPartialRefundable = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "243.50",
        currency: "GBP",
        before: "2023-08-02T00:00:00.000Z",
      },
      {
        refund_amount: "143.50",
        currency: "GBP",
        before: "2023-08-06T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
  },
};

export const FullAndPartialRefundableWithCheckInTime = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "243.50",
        currency: "GBP",
        before: "2023-08-02T00:00:00.000Z",
      },
      {
        refund_amount: "143.50",
        currency: "GBP",
        before: "2023-08-10T04:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    checkInAfterTime: "04:00",
    bookingDate: "2023-07-29T14:42:00Z",
  },
};

export const FullRefundableOnly = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "243.50",
        currency: "GBP",
        before: "2023-08-02T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
  },
};

export const NotRefundable = {
  render: Template,

  args: {
    cancellationTimeline: [],
    bookingDate: "2023-07-29T14:42:00Z",
  },
};

export const PartialRefundableDeposit = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "143.50",
        currency: "GBP",
        before: "2023-08-06T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "deposit",
  },
};
export const FullRefundableOnlyDeposit = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "243.50",
        currency: "GBP",
        before: "2023-08-02T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "deposit",
  },
};

export const NotRefundableDeposit = {
  render: Template,

  args: {
    cancellationTimeline: [],
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "deposit",
  },
};

export const PartialRefundableGuarantee = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "143.50",
        currency: "GBP",
        before: "2023-08-06T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "guarantee",
  },
};
export const FullRefundableOnlyGuarantee = {
  render: Template,

  args: {
    cancellationTimeline: [
      {
        refund_amount: "243.50",
        currency: "GBP",
        before: "2023-08-02T00:00:00.000Z",
      },
    ],
    totalAmount: "243.50",
    checkInDate: "2023-08-10",
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "guarantee",
  },
};

export const NotRefundableGuarantee = {
  render: Template,

  args: {
    cancellationTimeline: [],
    bookingDate: "2023-07-29T14:42:00Z",
    paymentType: "guarantee",
  },
};
