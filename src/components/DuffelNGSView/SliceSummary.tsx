import { Icon } from "@components/shared/Icon";
import { OfferSlice } from "@duffel/api/types";
import { convertDurationToString } from "@lib/convertDurationToString";
import { getTimeString } from "@lib/getTimeString";
import { withPlural } from "@lib/withPlural";
import classNames from "classnames";
import React from "react";

export interface SliceSummaryProps {
  slice: OfferSlice;
}

export const SliceSummary: React.FC<SliceSummaryProps> = ({ slice }) => {
  const firstSegment = slice.segments[0];
  const lastSegment = slice.segments[slice.segments.length - 1];

  const segmentsAndStops = slice.segments.flatMap((segment, index) => {
    const stops = (segment.stops || []).map((stop) => stop.airport.iata_code!);
    if (index == 0) {
      // we use origins to identify the stop, so we ignore first segment since
      // it's origin is already shown in the first `SliceSummaryTimeAndPlace`
      return stops;
    } else {
      return [segment.origin.iata_code!, ...stops];
    }
  });

  return (
    <div className="slice-summary">
      <SliceSummaryTimeAndPlace
        time={getTimeString(firstSegment.departing_at)}
        place={firstSegment.origin.iata_code!}
        alignment="end"
      />
      <SliceStopsAndDurationOverview
        duration={convertDurationToString(slice.duration!)}
        stops={segmentsAndStops}
      />
      <Icon name="flight" size={20} className="slice-summary__plane" />
      <SliceSummaryTimeAndPlace
        time={getTimeString(lastSegment.arriving_at)}
        place={lastSegment.destination.iata_code!}
        alignment="start"
      />
    </div>
  );
};

const SliceSummaryTimeAndPlace: React.FC<{
  time: string;
  place: string;
  alignment: "start" | "end";
}> = ({ time, place, alignment }) => (
  <div
    className={classNames(
      "slice-summary__time-and-place",
      `slice-summary__time-and-place--align-${alignment}`,
    )}
  >
    <div className="slice-summary__time">{time}</div>
    <div className="slice-summary__place">{place}</div>
  </div>
);

const SliceStopsAndDurationOverview: React.FC<{
  duration: string;
  stops: string[];
}> = ({ duration, stops }) => {
  return (
    <div>
      <p className="slice-summary__duration">{duration}</p>

      <div
        className="slice-summary__flight-line-container"
        style={{
          gridTemplateColumns:
            stops.length === 0
              ? "1fr"
              : `auto repeat(${stops.length}, 20px auto)`,
        }}
      >
        {stops.length === 0 ? (
          <div
            className={classNames(
              "slice-summary__flight-line-color",
              "slice-summary__flight-line-color--full-width",
            )}
          />
        ) : (
          <>
            {new Array(stops.length + 1).fill(0).map((_value, index, all) => (
              <React.Fragment key={index}>
                <div className="slice-summary__flight-line-color" />
                {index !== all.length - 1 && (
                  <div className="slice-summary__flight-line-dot" />
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      <p className="slice-summary__stops">
        {stops.length === 0
          ? "Direct"
          : `${withPlural(stops.length, "stop", "stops")}, ${stops.join(", ")}`}
      </p>
    </div>
  );
};
