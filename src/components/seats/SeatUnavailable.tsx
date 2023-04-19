import * as React from "react";
import { SeatMapCabinRowSectionElementSeat } from "src/types/SeatMap";
import { Icon } from "../Icon";

export const SeatUnavailable: React.FC<{
  seat: SeatMapCabinRowSectionElementSeat;
}> = ({ seat }) => (
  <span
    className="map-element map-element__seat"
    aria-label={`${seat.designator} ${seat.name || "Seat"} Unavailable`}
  >
    <Icon name="close" size={14} />
  </span>
);
