import { OfferSlice } from "@duffel/api/types";
import { getFareBrandName } from "@lib/getFareBrandName";
import { getCarriers } from "./getCarriers";
import { getSegmentFlightNumber } from "./getSegmentFlightNumber";

export const getAirlinesText = (
  forSlice: OfferSlice,
  withFlightNumbers?: boolean,
  withFareBrand?: boolean
): string => {
  const fareBrandName = getFareBrandName(
    "fare_brand_name" in forSlice ? forSlice.fare_brand_name : null,
    forSlice.segments[0]
  );

  const { marketingCarrier, operatingCarriers } = getCarriers(
    forSlice.segments
  );
  const isMarketingSameAsOperating =
    operatingCarriers.length > 0 &&
    marketingCarrier &&
    marketingCarrier.name === operatingCarriers[0].name;

  const fullyOperatedByOneOtherCarrier =
    operatingCarriers.length === 1 && !isMarketingSameAsOperating;

  const fareBrandNameLabel =
    withFareBrand && fareBrandName ? `${fareBrandName} · ` : "";

  const sellerLabel =
    operatingCarriers.length > 1 || fullyOperatedByOneOtherCarrier
      ? "Sold by "
      : "";

  const operatorLabel = fullyOperatedByOneOtherCarrier ? ", operated by " : "";

  const partialOperatorLabel =
    operatingCarriers.length > 1 ? ", partially operated by " : "";

  const airlines = operatingCarriers
    .filter(({ name }) => marketingCarrier && name !== marketingCarrier.name)
    .map(({ name }) => name)
    .join(", ");

  const flightNumbers = withFlightNumbers
    ? " · " + forSlice.segments.map(getSegmentFlightNumber).join(", ")
    : "";

  return `${fareBrandNameLabel}${sellerLabel}${
    marketingCarrier && marketingCarrier.name
  }${operatorLabel}${partialOperatorLabel}${airlines}${flightNumbers}`;
};
