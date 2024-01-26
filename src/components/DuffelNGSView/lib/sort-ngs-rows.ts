import { NGSShelf } from ".";
import { NGSOfferRow } from "./group-offers-for-ngs-view";

export type SortDirection = "asc" | "desc";

export const sortNGSRows = (
  rows: NGSOfferRow[],
  sortShelf: NGSShelf,
  sortDirection: SortDirection,
): NGSOfferRow[] => {
  const sortedRows = [...rows].sort((a, b) => {
    const aAmount = +(a[sortShelf!]?.total_amount || 0);
    const bAmount = +(b[sortShelf!]?.total_amount || 0);
    if (aAmount && bAmount) {
      return sortDirection === "asc" ? aAmount - bAmount : bAmount - aAmount;
    }
    return 0;
  });

  return sortedRows;
};
