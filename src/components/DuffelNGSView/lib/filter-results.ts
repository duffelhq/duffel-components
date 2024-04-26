import { OfferSlice } from "@duffel/api/types";
import { NGSTableProps } from "../NGSTable";

export interface Filters {
  airlines: Array<{ iata_code: string; name: string }>;
  stops: "direct-only" | "1-stop-at-most" | "2-stops-at-most" | "any";
  times: {
    departure: [number, number];
    arrival: [number, number];
  };
}

export function filterResults(
  offers: NGSTableProps["offers"],
  currentSliceIndex: number,
  filters: Filters,
) {
  return offers.filter((offer) => {
    const currentOfferSlice = offer.slices[currentSliceIndex];
    return [
      isMatchOnAirlines(offer, filters.airlines) &&
        isMatchOnStops(currentOfferSlice, filters.stops) &&
        isMatchOnTimes(currentOfferSlice, filters.times),
    ].every((isTrue) => isTrue);
  });
}
function isMatchOnAirlines(
  offer: NGSTableProps["offers"][number],
  airlines: Filters["airlines"],
) {
  return airlines.some(
    (airline) => offer.owner.iata_code === airline.iata_code,
  );
}

function isMatchOnStops(
  currentOfferSlice: OfferSlice,
  stops: Filters["stops"],
) {
  const sliceStops =
    currentOfferSlice.segments.length -
    1 +
    currentOfferSlice.segments.reduce(
      (stopCount, segment) => stopCount + (segment.stops?.length || 0),
      0,
    );

  switch (stops) {
    case "direct-only":
      return sliceStops === 0;
    case "1-stop-at-most":
      return sliceStops <= 1;
    case "2-stops-at-most":
      return sliceStops <= 2;
    case "any":
      return true;
  }
}

function isMatchOnTimes(
  currentOfferSlice: OfferSlice,
  times: Filters["times"],
) {
  const firstSegment = currentOfferSlice.segments[0];
  const lastSegment =
    currentOfferSlice.segments[currentOfferSlice.segments.length - 1];

  const sliceDepartureTime = new Date(firstSegment.departing_at);
  const sliceArrivalTime = new Date(lastSegment.arriving_at);

  const [departureRangeStart, departureRangeEnd] = times.departure;
  const [arrivalRangeStart, arrivalRangeEnd] = times.arrival;

  const sliceDepartureTimeInMinutes =
    transformDateToMinutes(sliceDepartureTime);

  const sliceArrivalTimeInMinutes = transformDateToMinutes(sliceArrivalTime);

  return (
    sliceDepartureTimeInMinutes >= departureRangeStart &&
    sliceDepartureTimeInMinutes <= departureRangeEnd &&
    sliceArrivalTimeInMinutes >= arrivalRangeStart &&
    sliceArrivalTimeInMinutes <= arrivalRangeEnd
  );
}

function transformDateToMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}
