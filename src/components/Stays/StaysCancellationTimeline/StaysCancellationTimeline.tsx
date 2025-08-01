import * as React from "react";
import { StaysCancellationTimelineDeposit } from "./StaysCancellationTimelineDeposit";
import { StaysCancellationTimelineGuarantee } from "./StaysCancellationTimelineGuarantee";
import { StaysCancellationTimelinePayNow } from "./StaysCancellationTimelinePayNow";
import { VSpace } from "@components/shared/VSpace";
import { StaysRate, StaysRateCancellationTimeline } from "@duffel/api/types";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

export interface StaysCancellationTimelineProps {
  paymentType?: StaysRate["payment_type"];
  cancellationTimeline: StaysRateCancellationTimeline[];
  totalAmount: string;
  bookingDate: string;
  checkInDate: string;
  checkInAfterTime?: string;
}

export const StaysCancellationTimeline: React.FC<
  StaysCancellationTimelineProps
> = ({ paymentType, ...props }) => {
  return (
    <WithComponentStyles>
      <VSpace space={24} className="duffel-components" data-selector="fs-show">
        {(paymentType === "pay_now" || !paymentType) && (
          <StaysCancellationTimelinePayNow {...props} />
        )}
        {paymentType === "deposit" && (
          <StaysCancellationTimelineDeposit {...props} />
        )}
        {paymentType === "guarantee" && (
          <StaysCancellationTimelineGuarantee {...props} />
        )}
      </VSpace>
    </WithComponentStyles>
  );
};
