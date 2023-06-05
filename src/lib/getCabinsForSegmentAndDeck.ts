import { SeatMap } from "../types/SeatMap";

export const getCabinsForSegmentAndDeck = (forDeck: number, seatMap: SeatMap) =>
  seatMap.cabins.filter((cabin) => cabin.deck === forDeck);
