import { OfferSliceSegmentPassenger } from "@duffel/api/types";
import { DuffelNGSViewOffer } from "./types";
import { NGSOfferRow } from "./group-offers-for-ngs-view";
import { NGS_SHELVES } from ".";

// Deduplicate fare brands (only show the cheapest offer within fare brand)
export const deduplicateMappedOffersByFareBrand = (
  offersMap: Record<string, NGSOfferRow>,
  sliceIndex?: number,
) => {
  Object.entries(offersMap).map(([sliceKey, row]) => {
    const deduplicatedRow: NGSOfferRow = {
      slice: row.slice,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
    NGS_SHELVES.map((shelf) => {
      if (row[shelf]) {
        deduplicatedRow[shelf] = groupByFareBrandName(row[shelf]!, sliceIndex)
          .map((offers) => getCheapestOffer(offers))
          .flat();
      }
    });
    offersMap[sliceKey] = deduplicatedRow;
  });
  return offersMap;
};

export const getFareBrandNameForOffer = (
  offer: DuffelNGSViewOffer,
  sliceIndex?: number,
): string => {
  // Cabin class can vary within a slice across passengers and segments. Here we
  // make a list of all cabin classes present in the slice.
  const cabinClasses = offer.slices[sliceIndex || 0].segments
    .flatMap((segment) => segment.passengers)
    .reduce<OfferSliceSegmentPassenger["cabin_class"][]>(
      (cabinClasses, passenger) => {
        if (cabinClasses.includes(passenger.cabin_class)) {
          return cabinClasses;
        }
        return [...cabinClasses, passenger.cabin_class];
      },
      [],
    );

  const fareBrandName =
    offer.slices[sliceIndex || 0].fare_brand_name || cabinClasses.join("/");
  return fareBrandName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getCheapestOffer = (
  offers: DuffelNGSViewOffer[],
): DuffelNGSViewOffer =>
  offers.find(
    (offer) =>
      +offer.total_amount ==
      Math.min(...offers.map((offer) => +offer.total_amount)),
  )!;

export const groupByFareBrandName = (
  offers: DuffelNGSViewOffer[],
  sliceIndex?: number,
): DuffelNGSViewOffer[][] => {
  const groupedResult: { [key: string]: DuffelNGSViewOffer[] } = offers.reduce(
    (
      previous: { [key: string]: DuffelNGSViewOffer[] },
      current: DuffelNGSViewOffer,
    ) => {
      const key = getFareBrandNameForOffer(current, sliceIndex);
      if (!previous[key]) {
        previous[key] = [];
      }

      previous[key].push(current);
      return previous;
    },
    {},
  );
  return Object.values(groupedResult);
};
