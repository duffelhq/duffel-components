import { OfferRequest, OfferSlice } from "@duffel/api/types";
import { NGSShelf } from ".";
import { deduplicateMappedOffersByFareBrand } from "./deduplicate-mapped-offers-by-fare-brand";

export type NGSOfferRow = Record<"slice", OfferSlice> &
  Record<NonNullable<NGSShelf>, OfferRequest["offers"] | null>;

export const getNGSSliceKey = (
  slice: OfferSlice,
  ownerId: string | null,
  includeFareBrand?: boolean,
): string => {
  const flightNumbers = slice.segments
    .map((segment) => segment.marketing_carrier_flight_number)
    .join("-");
  return `${ownerId}-${flightNumbers}${includeFareBrand ? `-${slice.fare_brand_name}` : ""}`;
};

const filterOffersThatMatchCurrentSlice = (
  offers: OfferRequest["offers"],
  previousSliceKeys: string[],
) => {
  const filteredOffers = previousSliceKeys.length > 0 ? [] : offers;
  if (previousSliceKeys.length > 0) {
    for (const offer of offers) {
      let match = true;
      for (const [index, sliceKey] of previousSliceKeys.entries()) {
        if (
          sliceKey !==
          getNGSSliceKey(offer.slices[index], offer.owner.iata_code, true)
        ) {
          match = false;
          break;
        }
      }
      if (match) {
        filteredOffers.push(offer);
      }
    }
  }
  return filteredOffers;
};

export const groupOffersForNGSView = (
  offers: OfferRequest["offers"],
  sliceIndex: number,
  previousSliceKeys: string[],
): NGSOfferRow[] => {
  // Only display offers where previous slices match the current selection
  const filteredOffers = filterOffersThatMatchCurrentSlice(
    offers,
    previousSliceKeys,
  );

  const offersMap: Record<string, NGSOfferRow> = {};
  filteredOffers.forEach((offer) => {
    if (sliceIndex > offer.slices.length) {
      throw new Error(
        "Attempted to call `groupOffersForNGSView` with an invalid slice index",
      );
    }

    const slice = offer.slices[sliceIndex];
    const sliceKey = getNGSSliceKey(slice, offer.owner.iata_code);

    if (slice.ngs_shelf === null) {
      throw new Error(
        "Attempted to call `groupOffersForNGSView` with an invalid ngs_shelf",
      );
    }

    if (offersMap[sliceKey]) {
      if (offersMap[sliceKey][slice.ngs_shelf]) {
        offersMap[sliceKey][slice.ngs_shelf]?.push(offer);
      } else {
        offersMap[sliceKey][slice.ngs_shelf] = [offer];
      }
    } else {
      offersMap[sliceKey] = {
        slice: offer.slices[sliceIndex],
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        [slice.ngs_shelf]: [offer],
      };
    }
  });

  return Object.values(deduplicateMappedOffersByFareBrand(offersMap));
};
