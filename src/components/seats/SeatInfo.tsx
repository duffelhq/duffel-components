import * as React from "react";
import {
  SeatMapCabinRowSectionAvailableService,
  SeatMapCabinRowSectionElementSeat,
} from "src/types/SeatMap";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";

export interface SeatInfoProps {
  seat: SeatMapCabinRowSectionElementSeat | null;
  service: SeatMapCabinRowSectionAvailableService | undefined;
}

export const SeatInfo: React.FC<SeatInfoProps> = ({ seat, service }) => {
  const price = service
    ? moneyStringFormatter(service.total_currency)(+service.total_amount)
    : "";

  return (
    <div className="seat-info">
      <div className="seat-info__details">
        <strong>{seat?.designator}</strong>
        <span>{seat?.name || "Seat"} </span>
        <strong>{price}</strong>
      </div>
      {seat?.disclosures.map((disclosure, index) => (
        <div key={index} className="seat-info__disclosure">
          {disclosure}
        </div>
      ))}
    </div>
  );
};
