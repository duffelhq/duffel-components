import * as React from "react";
import { Policy } from "./Policy";
import { StaysRateCancellationTimeline } from "@duffel/api/types";
import { getDateString } from "@lib/getDateString";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { VSpace } from "@components/shared/VSpace";
import { HSpace } from "@components/shared/HSpace";
import { TimelineItem } from "./TimelineItem";
import { renderTimelineDateTime } from "./lib/renderTimelineDateTime";
import { Color } from "@lib/colors";

interface StaysCancellationTimelineGuaranteeProps {
  cancellationTimeline: StaysRateCancellationTimeline[];
  totalAmount: string;
  bookingDate: string;
  checkInDate: string;
  checkInAfterTime?: string;
}

const FullRefundPolicy: React.FC<{
  before: string;
}> = ({ before }) => {
  return (
    <Policy
      iconName="check_large"
      iconColor="--GREEN-700"
      label="Free cancellation"
    >
      You may cancel for free before{" "}
      {getDateString(before, "mediumWithTimeAndTimezone")}. No payment will be
      required.
    </Policy>
  );
};

const PartialRefundPolicy: React.FC<{
  cancellationTimeline: StaysRateCancellationTimeline;
  totalAmount: string;
}> = ({ cancellationTimeline, totalAmount }) => (
  <Policy
    iconName="check_large"
    iconColor="--YELLOW-700"
    label="Reduced penalty if cancelled"
  >
    If you cancel before{" "}
    {getDateString(cancellationTimeline.before, "mediumWithTimeAndTimezone")}, a
    cancellation fee of{" "}
    {moneyStringFormatter(cancellationTimeline.currency)(
      +totalAmount - +cancellationTimeline.refund_amount,
    )}{" "}
    will apply.
  </Policy>
);

const OnlyNoRefundPolicy: React.FC = () => (
  <Policy
    label="Full penalty if cancelled"
    iconName="close"
    iconColor="--PINK-700"
  >
    If you cancel this booking at any time, the full payment amount will be
    charged as a cancellation fee.
  </Policy>
);

const NoRefundPolicy: React.FC<{
  afterDate: string;
  hasFreeCancellation?: boolean;
}> = ({ afterDate, hasFreeCancellation }) => (
  <Policy
    label={
      hasFreeCancellation ? "Cancellation fee" : "Full penalty if cancelled"
    }
    iconName="close"
    iconColor="--PINK-700"
  >
    If you cancel after {getDateString(afterDate, "mediumWithTimeAndTimezone")},
    a cancellation fee will {hasFreeCancellation ? "apply" : "be charged"}.
  </Policy>
);

export const StaysCancellationTimelineGuarantee: React.FC<
  StaysCancellationTimelineGuaranteeProps
> = ({
  cancellationTimeline,
  totalAmount,
  checkInDate,
  checkInAfterTime,
  bookingDate,
}) => {
  const checkInDateTime = `${checkInDate}${
    checkInAfterTime ? `T${checkInAfterTime}` : ""
  }`;
  const hasFreeCancellation =
    cancellationTimeline.length > 0 &&
    cancellationTimeline[0].refund_amount === totalAmount;
  return (
    <>
      <VSpace space={8}>
        {cancellationTimeline.map((timelineItem) => {
          if (+timelineItem.refund_amount === 0) {
            // We don't expect the amount to ever be 0, and we are handling no-refund case
            // separately outside of this mapping
            return null;
          }

          if (timelineItem.refund_amount === totalAmount) {
            return (
              <FullRefundPolicy
                key={timelineItem.before}
                before={timelineItem.before}
              />
            );
          }

          return (
            <PartialRefundPolicy
              key={timelineItem.before}
              cancellationTimeline={timelineItem}
              totalAmount={totalAmount}
            />
          );
        })}

        {cancellationTimeline.length ? (
          <NoRefundPolicy
            afterDate={
              cancellationTimeline[cancellationTimeline.length - 1].before
            }
            hasFreeCancellation={hasFreeCancellation}
          />
        ) : (
          <OnlyNoRefundPolicy />
        )}
      </VSpace>

      {cancellationTimeline.length > 0 && (
        <>
          <div className="stays-cancellation-timeline-divider" />

          <HSpace
            space={0}
            className="u-paddingVertical24"
            style={{ justifyContent: "center" }}
          >
            {cancellationTimeline.map((timelineItem, index) => {
              const currentColor: Color =
                timelineItem.refund_amount === totalAmount
                  ? "--GREEN-700"
                  : "--YELLOW-700";

              let prevColor: Color;
              if (index === 0) {
                prevColor = "--GREY-300";
              } else if (
                cancellationTimeline[index - 1].refund_amount === totalAmount
              ) {
                prevColor = "--GREEN-700";
              } else {
                prevColor = "--YELLOW-700";
              }

              const timelineSize =
                cancellationTimeline.length === 1 ? "extra-large" : "large";

              return (
                <>
                  {/* This is the start of the current section of the timeline - will have a dot and date above it */}
                  <TimelineItem
                    key={timelineItem.before}
                    lineColorLeft={prevColor}
                    lineColorRight={currentColor}
                    dotColor={currentColor}
                    size="extra-small"
                    label={index === 0 ? "Booking" : undefined}
                    aboveDot={renderTimelineDateTime(
                      index === 0
                        ? bookingDate
                        : cancellationTimeline[index - 1].before,
                    )}
                  />
                  {/* This is the main section of the line. Won't have a dot*/}
                  <TimelineItem
                    key={timelineItem.before + "-line"}
                    lineColorLeft={currentColor}
                    lineColorRight={currentColor}
                    label={
                      timelineItem.refund_amount === totalAmount
                        ? "Free cancellation"
                        : "Reduced penalty"
                    }
                    dot={false}
                    size={timelineSize}
                    description={moneyStringFormatter(timelineItem.currency)(
                      +timelineItem.refund_amount,
                    )}
                  />

                  {/*
                      This is the last timeline - ends the last section with a dot and connect with the red section
                      towards the check-in date. The assumption here is that there will always be a time period between
                      the last cancellation deadline and the check in date.
                     */}
                  {index === cancellationTimeline.length - 1 && (
                    <>
                      <TimelineItem
                        key={timelineItem.before + "-end"}
                        lineColorLeft={currentColor}
                        lineColorRight="--PINK-700"
                        dotColor="--PINK-700"
                        size="small"
                        aboveDot={renderTimelineDateTime(timelineItem.before)}
                      />
                      <TimelineItem
                        key={timelineItem.before + "-end"}
                        lineColorLeft="--PINK-700"
                        lineColorRight="--PINK-700"
                        dot={false}
                        label={
                          hasFreeCancellation
                            ? "Cancellation fee"
                            : "Full penalty"
                        }
                      />
                      <TimelineItem
                        key="end"
                        lineColorLeft="--PINK-700"
                        label={
                          <>
                            Check-in
                            <br />
                            at the hotel
                          </>
                        }
                        size="small"
                        aboveDot={renderTimelineDateTime(
                          checkInDateTime,
                          Boolean(checkInAfterTime),
                        )}
                      />
                    </>
                  )}
                </>
              );
            })}
          </HSpace>
        </>
      )}
    </>
  );
};
