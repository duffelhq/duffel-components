import { OfferSliceSegment, OrderSliceSegment } from "@duffel/api/types";
import { TravelDetails } from "src/types/TravelDetails";
import { convertDurationToString } from "./convertDurationToString";
import { getFareBrandName } from "./getFareBrandName";
import { getSegmentDates } from "./getSegmentDates";
import { getSegmentFlightNumber } from "./getSegmentFlightNumber";
import { isISO8601Duration } from "./isISO8601Duration";

export const getTravelItem = (
  fromSegment: OfferSliceSegment | OrderSliceSegment,
  fareBrandName: string | null,
): TravelDetails<"order" | "offer"> => {
  const { origin, destination } = fromSegment;
  const { arrivingAt, departingAt } = getSegmentDates(fromSegment);

  return {
    originDestination: `${origin.iata_code}-${destination.iata_code}`,
    arrivingAt: arrivingAt!,
    departingAt: departingAt!,
    origin,
    destination,
    fareBrandName: getFareBrandName(fareBrandName, fromSegment),
    cabinClass:
      fromSegment.passengers?.length > 0
        ? fromSegment.passengers[0].cabin_class_marketing_name ||
          fromSegment.passengers[0].cabin_class
        : "",
    flight: getSegmentFlightNumber(fromSegment),
    aircraft: (fromSegment.aircraft && fromSegment.aircraft.name) || "",
    flightDuration:
      fromSegment.duration &&
      typeof fromSegment.duration === "string" &&
      isISO8601Duration(fromSegment.duration)
        ? convertDurationToString(fromSegment.duration)
        : null,

    airline: fromSegment.marketing_carrier,
    operatedBy: fromSegment.operating_carrier
      ? fromSegment.operating_carrier.name
      : undefined,
    baggagesIncluded: {
      // NOTE: need to make passengers optional because order request change offer slice
      // shares the same type as offer's slice when it shouldn't
      carryOn: fromSegment.passengers?.[0].baggages?.find(
        (baggage) => baggage.type === "carry_on",
      )?.quantity,
      checked: fromSegment.passengers?.[0].baggages?.find(
        (baggage) => baggage.type === "checked",
      )?.quantity,
    },
    originTerminal: fromSegment.origin_terminal,
    destinationTerminal: fromSegment.destination_terminal,
  };
};
