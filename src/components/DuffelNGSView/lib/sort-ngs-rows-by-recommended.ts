import { NGSOfferRow } from "./group-offers-for-ngs-view";
import { parse, toMinutes } from "duration-fns";
import { getCheapestOfferAmount } from "./sort-ngs-rows-by-shelf-price";

const getAmountForRecommendedSort = (row: NGSOfferRow): number => {
  // Use cheapest fare in the standard shelf if it exists
  if (row[2] && row[2].length > 0) return getCheapestOfferAmount(row[2])!;
  // If it doesn’t exist use the price of the shelf above (and do this until there are no shelves left to use).
  if (row[3] && row[3].length > 0) return getCheapestOfferAmount(row[3])!;
  if (row[4] && row[4].length > 0) return getCheapestOfferAmount(row[4])!;
  if (row[5] && row[5].length > 0) return getCheapestOfferAmount(row[5])!;
  // If there is nothing in shelf 2-5 then use shelf 1 but with 2 * the price.
  return 2 * (getCheapestOfferAmount(row[1]) || 0);
};

// Sort by the product of the duration and the price of the cheapest fare in the standard shelf (ideally)
export const sortNGSRowsByRecommended = (rows: NGSOfferRow[]): NGSOfferRow[] =>
  rows.sort((aRow, bRow) => {
    if (aRow.slice.duration === null || bRow.slice.duration === null) return 0;

    const aParsedDuration = parse(aRow.slice.duration);
    const bParsedDuration = parse(bRow.slice.duration);

    const aDurationInMinutes = toMinutes(aParsedDuration);
    const bDurationInMinutes = toMinutes(bParsedDuration);

    const aCheapestOfferAmount = getAmountForRecommendedSort(aRow);
    const bCheapestOfferAmount = getAmountForRecommendedSort(bRow);

    const aProduct = aDurationInMinutes * aCheapestOfferAmount;
    const bProduct = bDurationInMinutes * bCheapestOfferAmount;

    return aProduct - bProduct;
  });
