import { SeatMap } from "src/types/SeatMap";

export const getCabins = (
  forDeck: number,
  forSegmentId: string,
  segments: SeatMap[]
) => {
  const seatmap = segments.find(
    (segment) => segment.segment_id === forSegmentId
  );

  if (!seatmap?.cabins || seatmap?.cabins.length === 0) return { cabins: null };

  const cabinsForDeck = seatmap?.cabins.filter(
    (cabin) => cabin.deck === forDeck
  );

  return {
    cabins: cabinsForDeck,
    hasMultipleDecks: cabinsForDeck.length !== seatmap.cabins.length,
    anyHasWings: seatmap.cabins.some((cabin) => cabin.wings),
  };
};
