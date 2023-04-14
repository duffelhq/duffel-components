import * as React from "react";
import {
  SeatMapCabinRowSectionAvailableService,
  SeatMapCabinRowSectionElementSeat,
} from "src/types/SeatMap";
import { moneyStringFormatter } from "@lib/formatConvertedCurrency";

export interface SeatInfoProps {
  /**
   * The seat information.
   */
  seat: SeatMapCabinRowSectionElementSeat | null;
  /**
   * The service information.
   */
  service: SeatMapCabinRowSectionAvailableService | undefined;
}

/**
 * Contents of the seat info panel with seat information
 */
export const SeatInfo: React.FC<SeatInfoProps> = ({ seat, service }) => {
  const price = service
    ? moneyStringFormatter(service.total_currency)(+service.total_amount)
    : "";

  return (
    <div
      className="seat-info"
      style={{
        width: "220px",
        padding: "var(--SPACING-SM-1)",
        border: "1px solid rgba(59, 64, 86, 0.1)",
        borderRadius: "8px",
        background: "white",
        zIndex: "999",
        boxShadow: "0px 1px 4px rgba(59, 64, 86, 0.3)",
        position: "absolute",
        top: "-50px",
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
