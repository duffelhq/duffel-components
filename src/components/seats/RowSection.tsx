import classNames from "classnames";
import * as React from "react";
import { CreateOrderPayloadSeatService } from "src/types/CreateOrderPayload";
import { SeatMapCabinRow, SeatMapCabinRowSection } from "src/types/SeatMap";
import { Element } from "./Element";
import { EmptyElement } from "./EmptyElement";

interface RowSectionProps {
  row: SeatMapCabinRow;
  rowNumber: string | null;
  hasWings: boolean;
  section: SeatMapCabinRowSection;
  sectionIndex: number;
  selectedServicesMap: Record<string, CreateOrderPayloadSeatService>;
  onSeatToggled: (seatService: CreateOrderPayloadSeatService) => void;
  currentPassengerId: string;
  currentPassengerName: string;
  currentSegmentId: string;
}

export const RowSection: React.FC<RowSectionProps> = ({
  row,
  rowNumber,
  hasWings,
  section,
  sectionIndex,
  onSeatToggled,
  selectedServicesMap,
  currentPassengerId,
  currentPassengerName,
  currentSegmentId,
}) => {
  const rowLength = Object.keys(row.sections).length;
  const isOneSectionRow = rowLength === 1;

  return (
    <React.Fragment key={sectionIndex}>
      <div
        className={classNames("map-section", {
          "map-section--left": sectionIndex === 0,
          "map-section--right": !isOneSectionRow
            ? sectionIndex === rowLength - 1
            : false,
          "map-section--wing": hasWings,
        })}
      >
        {section.elements.length > 0 ? (
          section.elements.map((element, elementIndex) => (
            <React.Fragment key={elementIndex}>
              <Element
                sectionIndex={sectionIndex}
                elementIndex={elementIndex}
                element={element}
                selectedServicesMap={selectedServicesMap}
                onSeatToggled={onSeatToggled}
                currentPassengerId={currentPassengerId}
                currentSegmentId={currentSegmentId}
                currentPassengerName={currentPassengerName}
              />
            </React.Fragment>
          ))
        ) : (
          <EmptyElement />
        )}
      </div>
      {(sectionIndex < rowLength - 1 ||
        (isOneSectionRow && sectionIndex < rowLength)) && (
        <span className="map-section__aisle">{rowNumber}</span>
      )}
      {isOneSectionRow && sectionIndex === row.sections.length - 1 && (
        <EmptyElement />
      )}
    </React.Fragment>
  );
};
