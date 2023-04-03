import { Segment } from "@components/Segment";
import { usePassengersContext } from "@lib/usePassengersContext";
import classNames from "classnames";
import * as React from "react";
import { OfferSliceSegment } from "src/types/Offer";

export interface Passenger {
  id: string;
  name?: string | null;
}

export interface PassengerSelectionSegmentProps {
  segment: OfferSliceSegment;
  renderPassengerSelectionDetails: (
    passengerId: string,
    segmentId: string
  ) => React.ReactNode;
}

export const PassengerSelectionSegment: React.FC<
  PassengerSelectionSegmentProps
> = ({ segment, renderPassengerSelectionDetails }) => {
  const passengersContext = usePassengersContext();
  if (!passengersContext) {
    throw new Error(
      "PassengerSelectionSegment can only be used within PassengersProvider"
    );
  }
  const { passengers, dispatch, selectedSegment, selectedPassenger } =
    passengersContext;

  return (
    <li key={segment.id} className="passenger-selection-segment">
      {Object.keys(segment).length > 0 && <Segment segment={segment} />}
      {passengers.map((passenger, passengerIndex) => (
        <button
          data-testid={`passenger-${passenger.id}`}
          type="button"
          key={passenger.id}
          onClick={() =>
            dispatch({
              type: "selectPassenger",
              passengerId: passenger.id,
              segmentId: segment.id,
            })
          }
          className={classNames("passenger-selection-passenger", {
            "passenger-selection-passenger--selected":
              selectedSegment.id === segment.id &&
              selectedPassenger.id === passenger.id,
          })}
        >
          <span className="passenger-selection-passenger__identifier">
            {passenger.name || `Passenger ${passengerIndex + 1}`}
          </span>

          {renderPassengerSelectionDetails(passenger.id, segment.id)}
        </button>
      ))}
    </li>
  );
};
