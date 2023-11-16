import { Icon, IconName } from "@components/shared/Icon";
import { SeatMapCabinRowSectionElementAmenity } from "@duffel/api/types";
import * as React from "react";

export interface LegendProps {
  /**
   * The set of additional symbols to display
   */
  symbols: Set<SeatMapCabinRowSectionElementAmenity>;
}

/**
 * The legend for the seat map.
 */
export const Legend: React.FC<LegendProps> = ({ symbols }) => (
  <div className="seat-map__legend">
    <span className="seat-map__legend-item">
      <span
        className="seat-map__legend-seat seat-map__legend-seat--fee-payable"
        aria-label="Additional cost for seat"
      >
        <Icon
          name="seat_paid_indicator"
          className="seat-map__legend-seat--fee-payable-indicator"
          size={12}
        />
      </span>
      Additional Cost
    </span>
    <span className="seat-map__legend-item">
      <span
        className="seat-map__legend-seat seat-map__legend-seat--included"
        aria-label="Included seat"
      />
      Included
    </span>
    <span className="seat-map__legend-item">
      <span
        className="seat-map__legend-seat seat-map__legend-seat--selected"
        aria-label="Selected seat"
      />
      Selected
    </span>
    <span className="seat-map__legend-item">
      <span className="seat-map__legend-seat" aria-label="Unavailable seat">
        <Icon name="close" size={14} />
      </span>
      Unavailable
    </span>
    {[...symbols].map((symbol) => (
      <span
        key={symbol}
        className="seat-map__legend-item seat-map__legend-item--symbol"
      >
        <Icon name={symbol as IconName} size={20} />
        {symbol.split("_")[0]}
      </span>
    ))}
  </div>
);
