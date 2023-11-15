import { getRowNumber } from "@lib/getRowNumber";
import * as React from "react";
import { RowSection } from "./RowSection";
import { OrderService, SeatMapCabinRow } from "@duffel/api/types";
import { WithServiceInformation } from "src/types";

// TODO(idp): remove this when we merge https://github.com/duffelhq/duffel-api-javascript/pull/843
type CreateOrderService = Pick<OrderService, "id" | "quantity">;

export interface RowProps {
  row: SeatMapCabinRow;
  hasWings: boolean;
  selectedServicesMap: Record<
    string,
    WithServiceInformation<CreateOrderService>
  >;
  onSeatToggled: (
    seatService: WithServiceInformation<CreateOrderService>
  ) => void;
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
