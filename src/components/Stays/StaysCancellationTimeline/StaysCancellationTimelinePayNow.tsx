import * as React from "react";
import { Policy } from "./Policy";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import { getDateString } from "@lib/getDateString";
import { HSpace } from "@components/shared/HSpace";
import { TimelineItem } from "./TimelineItem";
import { StaysRateCancellationTimeline } from "@duffel/api/types";
import { VSpace } from "@components/shared/VSpace";
import { renderTimelineDateTime } from "./lib/renderTimelineDateTime";
import { Color } from "@lib/colors";

interface StaysCancellationTimelinePayNowProps {
  cancellationTimeline: StaysRateCancellationTimeline[];
  totalAmount: string;
  bookingDate: string;
  checkInDate: string;
  checkInAfterTime?: string;
}

const FullRefundPolicy: React.FC<{
  before: string;
  refundAmount: string;
  currency: string;
}> = ({ before, refundAmount, currency }) => (
  <Policy iconName="check" iconColor="--GREEN-700" label="Fully refundable">
    You may cancel for free before{" "}
    {getDateString(before, "mediumWithTimeAndTimezone")}. You will be receive a
    full refund of {moneyStringFormatter(currency)(+refundAmount)}.
  </Policy>
);

const PartialRefundPolicy: React.FC<{
  cancellationTimeline: StaysRateCancellationTimeline;
  totalAmount: string;
}> = ({ cancellationTimeline, totalAmount }) => {
  return (
    <Policy
      iconName="check"
      iconColor="--YELLOW-700"
      label="Refundable for a fee"
    >
      If you cancel before{" "}
      {getDateString(cancellationTimeline.before, "mediumWithTimeAndTimezone")},
      you will be receive a partial refund of{" "}
      {moneyStringFormatter(cancellationTimeline.currency)(
        +cancellationTimeline.refund_amount
      )}
      . A cancellation fee of{" "}
      {moneyStringFormatter(cancellationTimeline.currency)(
        +totalAmount - +cancellationTimeline.refund_amount
      )}{" "}
      will be retained.
    </Policy>
  );
};

const OnlyNoRefundPolicy: React.FC = () => (
  <Policy label="Non refundable" iconName="close" iconColor="--PINK-700">
    You have chosen a non-refundable rate. If you cancel this booking, you will
    not receive any refund.
  </Policy>
);

const NoRefundPolicy: React.FC<{
  afterDate: string;
}> = ({ afterDate }) => {
  return (
    <Policy label="No refund" iconName="close" iconColor="--PINK-700">
      From the {getDateString(afterDate, "mediumWithTimeAndTimezone")} onwards,
      you won&apos;t be able to get any refund for cancelling this booking.
    </Policy>
  );
};

export const StaysCancellationTimelinePayNow: React.FC<
  StaysCancellationTimelinePayNowProps
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
                refundAmount={timelineItem.refund_amount}
                currency={timelineItem.currency}
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
                        : cancellationTimeline[index - 1].before
                    )}
                  />
                  {/* This is the main section of the line. Won't have a dot*/}
                  <TimelineItem
                    key={timelineItem.before + "-line"}
                    lineColorLeft={currentColor}
                    lineColorRight={currentColor}
                    label={
                      timelineItem.refund_amount === totalAmount
                        ? "Full refund"
                        : "Partial refund"
                    }
                    dot={false}
                    size={timelineSize}
                    description={moneyStringFormatter(timelineItem.currency)(
                      +timelineItem.refund_amount
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
                        label="No refund"
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
                          Boolean(checkInAfterTime)
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
