import { Icon, IconName } from "@components/shared/Icon";
import { getSegmentCarriersTitle } from "@components/shared/SliceCarriersTitle";
import { OfferSlice as OfferSliceType } from "@duffel/api/types";
import { convertDurationToString } from "@lib/convertDurationToString";
import { getDateString } from "@lib/getDateString";
import { getDurationString } from "@lib/getDurationString";
import { getTimeString } from "@lib/getTimeString";
import { withPlural } from "@lib/withPlural";
import classNames from "classnames";
import React from "react";

export interface OfferSliceProps {
  slice: OfferSliceType;
}

export const OfferSlice: React.FC<OfferSliceProps> = ({ slice }) => {
  const firstSegment = slice.segments[0];
  const lastSegment = slice.segments[slice.segments.length - 1];

  const startDate = getDateString(firstSegment.departing_at!, "long");
  const endDate = getDateString(lastSegment.departing_at!, "long");
  const endsOnDifferentDate = startDate != endDate;

  return (
    <div>
      {/*  start date */}
      <OfferSliceRow
        withGreyBackground
        icon="calendar_month"
        dottedLine="after"
      >
        {startDate}
      </OfferSliceRow>

      {/* segments information */}
      {slice.segments.map((segment, index) => {
        const isLast = index === slice.segments.length - 1;
        return (
          <>
            <OfferSliceRow
              dottedLine="before"
              icon="flight_takeoff"
              time={getTimeString(segment.departing_at)}
            >
              Depart from {segment.origin.name} ({segment.origin.iata_code})
            </OfferSliceRow>

            <OfferSliceRow compact>
              {[
                convertDurationToString(segment.duration!),
                getSegmentCarriersTitle(segment),
                `${segment.marketing_carrier.iata_code}${segment.marketing_carrier_flight_number}`,
                segment.aircraft?.name,
                segment.passengers[0].cabin_class_marketing_name ||
                  segment.passengers[0].cabin_class,
              ].join(" · ")}
            </OfferSliceRow>

            {segment.stops && segment.stops.length > 0 && (
              <OfferSliceRow compactCallout>
                <p>
                  {withPlural(segment.stops.length, "stop", "stops")}:{" "}
                  {segment.stops
                    .map(
                      (stop) =>
                        `${convertDurationToString(stop.duration)} in ${stop.airport.iata_code}`,
                    )
                    .join(",")}
                </p>
              </OfferSliceRow>
            )}

            <OfferSliceRow
              icon="flight_landing"
              time={getTimeString(segment.arriving_at)}
            >
              Arrive at {segment.destination.name} (
              {segment.destination.iata_code})
            </OfferSliceRow>

            {!isLast && (
              <OfferSliceRow
                dottedLine="both"
                withGreyBackground
                icon="airline_stops"
              >
                {getDurationString(
                  segment.arriving_at,
                  slice.segments[index + 1].departing_at,
                )}{" "}
                Layover at {segment.destination.name} (
                {segment.destination.iata_code})
              </OfferSliceRow>
            )}
          </>
        );
      })}

      {/* end date, if not the same */}
      {endsOnDifferentDate && (
        <OfferSliceRow
          withGreyBackground
          icon="calendar_month"
          dottedLine="before"
        >
          {endDate}
        </OfferSliceRow>
      )}
    </div>
  );
};

type OfferSliceRow = React.PropsWithChildren<{
  time?: string;
  icon?: IconName;
  withGreyBackground?: boolean;
  compact?: boolean;
  compactCallout?: boolean;
  dottedLine?: "before" | "after" | "both";
}>;

const OfferSliceRow: React.FC<OfferSliceRow> = ({
  time,
  icon,
  withGreyBackground,
  compact,
  dottedLine,
  compactCallout,
  children,
}) => (
  <div
    className={classNames(
      "offer-slice__row",
      withGreyBackground && "offer-slice__row--grey-background",
      compact && "offer-slice__row--compact",
      compactCallout && `offer-slice__row--compact-callout`,
    )}
  >
    <div className="offer-slice__row-time">{time && <span>{time}</span>}</div>
    <div
      className={classNames(
        "offer-slice__row-icon-container",
        !icon && "offer-slice__row-icon-container--no-icon",
        dottedLine && `offer-slice__row-icon-container--dotted-${dottedLine}`,
      )}
    >
      {icon && <Icon color="--GREY-600" size={16} name={icon} />}
    </div>
    <div>{children}</div>
  </div>
);
