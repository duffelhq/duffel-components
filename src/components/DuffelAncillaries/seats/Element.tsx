import { isSeatElement } from "@lib/isSeatElement";
import * as React from "react";
import { Amenity } from "./Amenity";
import { EmptyElement } from "./EmptyElement";
import { ExitElement } from "./ExitElement";
import { SeatElement } from "./SeatElement";
import {
  CreateOrderService,
  SeatMapCabinRowSectionElement,
} from "@duffel/api/types";
import { WithServiceInformation } from "src/types";

interface ElementProps {
  sectionIndex: number;
  elementIndex: number;
  element: SeatMapCabinRowSectionElement;
  selectedServicesMap: Record<
    string,
    WithServiceInformation<CreateOrderService>
  >;
  onSeatToggled: (
    seatService: WithServiceInformation<CreateOrderService>
  ) => void;
  currentPassengerId: string;
  currentSegmentId: string;
  currentPassengerName: string;
}

export const Element: React.FC<ElementProps> = ({
  element,
  elementIndex,
  sectionIndex,
  onSeatToggled,
  selectedServicesMap,
  currentPassengerId,
  currentSegmentId,
  currentPassengerName,
}) => {
  return (
    <>
      {isSeatElement(element) ? (
        <SeatElement
          currentSegmentId={currentSegmentId}
          currentPassengerId={currentPassengerId}
          currentPassengerName={currentPassengerName}
          selectedServicesMap={selectedServicesMap}
          key={elementIndex}
          element={element}
          onSeatToggled={onSeatToggled}
        />
      ) : element.type === "empty" ? (
        <EmptyElement key={elementIndex} />
      ) : element.type === "exit_row" ? (
        <ExitElement key={elementIndex} isRight={sectionIndex > 0} />
      ) : (
        <Amenity key={elementIndex} type={element.type} />
      )}
    </>
  );
};
