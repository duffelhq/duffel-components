import { OfferRequest } from "@duffel/api/types";
import { NGSShelf } from ".";
import { NGSOfferRow } from "./group-offers-for-ngs-view";

export type SortDirection = "asc" | "desc";

export const getCheapestOfferAmount = (
  offers: OfferRequest["offers"] | null,
) => (offers ? Math.min(...offers.map((offer) => +offer.total_amount)) : null);

export const sortNGSRows = (
  rows: NGSOfferRow[],
  sortShelf: NGSShelf,
  sortDirection: SortDirection,
): NGSOfferRow[] => {
  const sortedRows = [...rows].sort((a, b) => {
    const aAmount = +(getCheapestOfferAmount(a[sortShelf!]) || 0);
    const bAmount = +(getCheapestOfferAmount(b[sortShelf!]) || 0);
    if (aAmount && bAmount) {
      return sortDirection === "asc" ? aAmount - bAmount : bAmount - aAmount;
    }
    if (aAmount) return -1;
    if (bAmount) return 1;
    return 0;
  });

  return sortedRows;
};
