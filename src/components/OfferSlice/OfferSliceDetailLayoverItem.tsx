import { Icon } from "@components/shared/Icon";
import { Stamp } from "@components/shared/Stamp";
import { startCase } from "lodash";
import * as React from "react";
import {
  LayoverDetails,
  SliceDetailItemChangeStatus,
} from "src/types/TravelDetails";

export interface SliceDetailsLayoverItemProps {
  layoverDetails: LayoverDetails;
  changeStatus?: SliceDetailItemChangeStatus;
  className?: string;
}

const getLayoverString = (layoverDetails: LayoverDetails) => {
  if (!layoverDetails) return "Missing layover details";
  const layoverString = `${layoverDetails.duration} layover at ${startCase(
    layoverDetails.airport.name
  )} (${layoverDetails.airport.iata_code})`;

  return layoverString;
};

export const OfferSliceDetailLayoverItem: React.FC<
  SliceDetailsLayoverItemProps
> = ({ layoverDetails }) => {
  const isNegativeDuration = layoverDetails?.duration.charAt(0) === "-";
  return (
    <div className="layover-item">
      <Stamp
        backgroundColor="var(--GREY-200)"
        color={isNegativeDuration ? "var(YELLOW-900)" : "var(--GREY-700)"}
      >
        {isNegativeDuration && <Icon name="warning" />}
        {"  " + getLayoverString(layoverDetails)}
      </Stamp>
    </div>
  );
};
