import * as React from "react";
import { PassengerSelectionSegment } from "./SelectionSegment";
import { usePassengersContext } from "@lib/usePassengersContext";

export interface Passenger {
  id: string;
  name?: string | null;
}

export interface PassengerSelectionProps {
  renderPassengerSelectionDetails: (
    passengerId: string,
    segmentId: string
  ) => React.ReactNode;
}

/**
 * The passenger selection component for seat selection and additional baggage
 */
export const PassengerSelection: React.FC<PassengerSelectionProps> = ({
  renderPassengerSelectionDetails,
}) => {
  const passengersContext = usePassengersContext();
  if (!passengersContext) {
    throw new Error(
      "PassengerSelection can only be used within PassengersProvider"
    );
  }
  return (
    <div className="passenger-selection">
      <ul className="passenger-selection__segments">
        {passengersContext.segments.map((segment) => (
          <PassengerSelectionSegment
            segment={segment}
            key={segment.id}
            renderPassengerSelectionDetails={renderPassengerSelectionDetails}
          />
        ))}
      </ul>
    </div>
  );
};
