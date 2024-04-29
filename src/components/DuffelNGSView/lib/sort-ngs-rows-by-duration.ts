import { NGSOfferRow } from "./group-offers-for-ngs-view";
import { parse, toMinutes } from "duration-fns";

type DurationSortDirection = "asc" | "desc";
export type DurationSort = DurationSortDirection | null;

export const sortNGSRowsByDuration = (
  rows: NGSOfferRow[],
  sortDirection: DurationSortDirection,
): NGSOfferRow[] =>
  rows.sort((aRow, bRow) => {
    if (aRow.slice.duration === null || bRow.slice.duration === null) return 0;

    const aParsedDuration = parse(aRow.slice.duration);
    const bParsedDuration = parse(bRow.slice.duration);

    const aDurationInMinutes = toMinutes(aParsedDuration);
    const bDurationInMinutes = toMinutes(bParsedDuration);

    if (sortDirection === "asc") {
      return aDurationInMinutes - bDurationInMinutes;
    } else {
      return bDurationInMinutes - aDurationInMinutes;
    }
  });
