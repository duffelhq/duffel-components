import * as React from "react";
import {
  SeatMapCabinRowSectionAvailableService,
  SeatMapCabinRowSectionElementSeat,
} from "src/types/SeatMap";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";

export interface SeatInfoProps {
  seat: SeatMapCabinRowSectionElementSeat | null;
  service: SeatMapCabinRowSectionAvailableService | undefined;
}

export const SeatInfo: React.FC<SeatInfoProps> = ({ seat, service }) => {
  const price = service
    ? moneyStringFormatter(service.total_currency)(+service.total_amount)
    : "";

  return (
    <div
      className="seat-info"
      style={{
        minWidth: "220px",
        padding: "var(--SPACING-SM-1)",
        border: "1px solid rgba(59, 64, 86, 0.1)",
        borderRadius: "8px",
        background: "white",
        zIndex: "999",
        boxShadow: "0px 1px 4px rgba(59, 64, 86, 0.3)",
        position: "fixed",
        bottom: "140px",
        width: "calc(100% - 48px)",
        left: "24px",
        boxSizing: "border-box",
      }}
    >
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
