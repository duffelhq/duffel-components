import { Icon, IconName } from "@components/shared/Icon";
import { SeatMapCabinRowSectionElementAmenity } from "@duffel/api/types";
import classNames from "classnames";
import * as React from "react";

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
