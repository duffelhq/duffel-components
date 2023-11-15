import { SeatMap } from "@duffel/api/types";

export const getCabinsForSegmentAndDeck = (forDeck: number, seatMap: SeatMap) =>
  seatMap.cabins.filter((cabin) => cabin.deck === forDeck);
