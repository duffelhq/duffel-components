import { getRowNumber } from "@lib/getRowNumber";
import * as React from "react";
import { CreateOrderPayloadSeatService } from "../../../types/CreateOrderPayload";
import { SeatMapCabinRow } from "../../../types/SeatMap";
import { RowSection } from "./RowSection";

export interface RowProps {
  row: SeatMapCabinRow;
  hasWings: boolean;
  selectedServicesMap: Record<string, CreateOrderPayloadSeatService>;
  onSeatToggled: (seatService: CreateOrderPayloadSeatService) => void;
  currentPassengerId: string;
  currentPassengerName: string;
  currentSegmentId: string;
}

export const Row: React.FC<RowProps> = ({
  row,
  hasWings,
  onSeatToggled,
  selectedServicesMap,
  currentPassengerId,
  currentPassengerName,
  currentSegmentId,
}) => {
  const rowNumber = getRowNumber(row);

  return (
    <>
      {row.sections.map((section, sectionIndex) => (
        <RowSection
          key={sectionIndex}
          row={row}
          rowNumber={rowNumber}
          hasWings={hasWings}
          section={section}
          sectionIndex={sectionIndex}
          selectedServicesMap={selectedServicesMap}
          onSeatToggled={onSeatToggled}
          currentPassengerId={currentPassengerId}
          currentPassengerName={currentPassengerName}
          currentSegmentId={currentSegmentId}
        />
      ))}
    </>
  );
};
