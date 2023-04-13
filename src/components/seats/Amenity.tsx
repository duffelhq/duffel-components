import classNames from "classnames";
import * as React from "react";
import { SeatMapCabinRowSectionElementAmenity } from "src/types/SeatMap";
import { useViewportWidth } from "@lib/useViewPortWidth";
import { Icon, IconName } from "../Icon";
import { isMobileOrTablet } from "@lib/isMobileOrTablet";

const amenitiesWithoutWrapper = ["bassinet", "exit_row"];
export interface AmenityProps {
  /**
   * The type of the amenity
   */
  type: SeatMapCabinRowSectionElementAmenity;
}

/**
 * An amenity on the seat map.
 */
export const Amenity: React.FC<AmenityProps> = ({ type }) => {
  const width = useViewportWidth();
  return (
    <div
      className={classNames("map-element map-element--amenity", {
        "map-element--wrapped": !amenitiesWithoutWrapper.includes(type),
      })}
      aria-label={type.toString()}
    >
      <Icon name={type as IconName} size={isMobileOrTablet(width) ? 16 : 24} />
    </div>
  );
};
