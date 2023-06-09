import { Icon, IconName } from "@components/shared/Icon";
import classNames from "classnames";
import * as React from "react";
import { SeatMapCabinRowSectionElementAmenity } from "../../../types/SeatMap";

const amenitiesWithoutWrapper = ["bassinet", "exit_row"];

export interface AmenityProps {
  type: SeatMapCabinRowSectionElementAmenity;
}

export const Amenity: React.FC<AmenityProps> = ({ type }) => (
  <div
    className={classNames("map-element map-element--amenity", {
      "map-element--wrapped": !amenitiesWithoutWrapper.includes(type),
    })}
    aria-label={type.toString()}
  >
    <Icon name={type as IconName} size={16} />
  </div>
);
