import {
  OfferAvailableServiceBaggageMetadata,
  OfferSlice,
  OfferSliceSegmentPassenger,
} from "@duffel/api/types";

const getBaggagesQuantity = (
  baggages: OfferSliceSegmentPassenger["baggages"],
  type: OfferAvailableServiceBaggageMetadata["type"],
): number => {
  return baggages
    .filter((baggage) => baggage.type === type)
    .reduce((quantity, baggage) => {
      return quantity + baggage.quantity;
    }, 0);
};

/**
 * Returns the passenger baggages object with the largest quantity of baggages
 * of a specified type for a slice. Baggage quantity can (very occasionally)
 * vary across passengers  and segments in a slice, so the 'max' baggages can
 * be used as the baseline for a slice.
 */
export const getMaxBaggagesForOfferSlice = (
  offerSlice: OfferSlice,
  type: OfferAvailableServiceBaggageMetadata["type"],
): OfferSliceSegmentPassenger["baggages"] => {
  let maxBaggages = offerSlice.segments[0].passengers[0].baggages;
  let maxBaggagesQuantity = getBaggagesQuantity(maxBaggages, type);

  offerSlice.segments.forEach((segment) => {
    segment.passengers
      .filter((passenger) => passenger.baggages.length > 0)
      .forEach((passenger) => {
        const baggagesQuantity = getBaggagesQuantity(passenger.baggages, type);

        if (baggagesQuantity > maxBaggagesQuantity) {
          maxBaggages = passenger.baggages;
          maxBaggagesQuantity = getBaggagesQuantity(maxBaggages, type);
        }
      });
  });

  // The API will always return a checked baggage item even if the quantity is
  // 0, so here we filter them out
  return maxBaggages.filter((baggages) => baggages.quantity > 0);
};
