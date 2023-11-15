import {
  SeatMapCabinRowSectionAvailableService,
  SeatMapCabinRowSectionElementSeat,
} from "@duffel/api/types";
import { moneyStringFormatter } from "@lib/moneyStringFormatter";
import * as React from "react";

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
