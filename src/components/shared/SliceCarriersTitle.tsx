import { OfferSlice, OfferSliceSegment } from "@duffel/api/types";
import * as React from "react";
import { AirlineLogo } from "./AirlineLogo";
import { HSpace } from "./HSpace";

export interface SliceCarriersTitleProps {
  slice: OfferSlice;
}

export const SliceCarriersTitle: React.FC<SliceCarriersTitleProps> = ({
  slice,
}) => {
  const marketingCarriers = slice.segments.map(
    ({ marketing_carrier }) => marketing_carrier,
  );
  const operatingCarriers = slice.segments.map(
    ({ operating_carrier }) => operating_carrier,
  );

  const firstMarketingCarrier = marketingCarriers[0];
  const marketingCarrierNamesSet = new Set<string>(
    marketingCarriers.map(({ name }) => name),
  );
  const operatingCarrierNamesSet = new Set<string>(
    operatingCarriers.map(({ name }) => name),
  );

  const marketingCarriersLabel = Array.from(marketingCarrierNamesSet).join(
    " & ",
  );

  const operatingCarriersLabel = Array.from(operatingCarrierNamesSet)
    .filter((name) => !marketingCarrierNamesSet.has(name))
    .join(" & ");

  const isPartialOperarion = Array.from(operatingCarrierNamesSet).some((name) =>
    marketingCarrierNamesSet.has(name),
  );

  return (
    <HSpace space={8}>
      <AirlineLogo
        size={20}
        name={firstMarketingCarrier.name}
        iataCode={firstMarketingCarrier.iata_code}
      />
      <div className="slice-carriers-title">
        {marketingCarriersLabel}{" "}
        {operatingCarriersLabel && (
          <span className="slice-carriers-title__operating-carrier">
            ({isPartialOperarion && "partially "}operated by{" "}
            {operatingCarriersLabel})
          </span>
        )}
        <span className="slice-carriers-title__operating-carrier">
          {" "}
          ·{" "}
          {slice.segments
            .map(
              (segment) =>
                segment.marketing_carrier.iata_code +
                segment.marketing_carrier_flight_number,
            )
            .join(", ")}
        </span>
      </div>
    </HSpace>
  );
};

export function getSegmentCarriersTitle(segment: OfferSliceSegment) {
  const marketingCarrier = segment.marketing_carrier;
  const operatingCarrier = segment.operating_carrier;

  const isOperatedByMarketingCarrier =
    marketingCarrier.name === operatingCarrier.name;

  return `${marketingCarrier.name}${
    isOperatedByMarketingCarrier ? "" : ` operated by ${operatingCarrier.name} `
  }`;
}
