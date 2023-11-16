import { Icon } from "@components/shared/Icon";
import { SeatMapCabinRowSectionElementSeat } from "@duffel/api/types";
import * as React from "react";

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
