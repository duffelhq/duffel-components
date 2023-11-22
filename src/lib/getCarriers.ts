import {
  Airline,
  OfferSliceSegment,
  OrderSliceSegment,
} from "@duffel/api/types";

export const getCarriers = (
  forSegments: OfferSliceSegment[] | OrderSliceSegment[]
) => {
  const operatorSet = new Set<string>();
  const operatingCarriers = new Array<Airline>();
  const marketingCarrier =
    forSegments.length > 0 ? forSegments[0].marketing_carrier : null;

  forSegments.forEach(({ operating_carrier }) => {
    if (
      operating_carrier &&
      operating_carrier.iata_code &&
      !operatorSet.has(operating_carrier.iata_code)
    ) {
      operatorSet.add(operating_carrier.iata_code);
      operatingCarriers.push(operating_carrier);
    }
  });

  return { marketingCarrier, operatingCarriers };
};
