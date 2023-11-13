import {
  Airline,
  Airport,
  OfferSlice,
  OfferSliceSegment,
  OfferSliceSegmentStop,
} from "src/types";
import { convertDurationToString } from "@lib/convertDurationToString";
import { getDurationString } from "@lib/getDurationString";
import { getFareBrandName } from "./getFareBrandName";
import { getLayoverOriginDestinationKey } from "./getLayoverOriginDestinationKey";
import { getSegmentDates } from "./getSegmentDates";
import { getSegmentFlightNumber } from "./getSegmentFlightNumber";
import { isISO8601Duration } from "@lib/isISO8601Duration";

interface TravelDetails<T extends "order" | "offer" | "diff"> {
  originDestination: string;
  departingAt: string;
  origin: T extends "diff" ? string : Airport;

  arrivingAt: string;
  destination: T extends "diff" ? string : Airport;

  aircraft: string | null;
  cabinClass: string;

  fareBrandName?: T extends "offer" ? string : never;
  flightDuration: string | null;

  flight: string;

  // For the diff view of an order, we use the `operatingCarrier` and `marketingCarrier` properties directly
  airline: T extends "diff" ? null : Airline;
  operatedBy?: string;

  baggagesIncluded?: {
    carryOn?: number;
    checked?: number;
  };

  originTerminal?: string | null;
  destinationTerminal?: string | null;
}

interface LayoverDetails {
  airport: Airport;
  duration: string;
  originDestinationKey?: string;
}

interface ItineraryTravelItem {
  type: "travel";
  id: string;
  layoverDetails: undefined;
  travelDetails: TravelDetails<"order" | "offer">;
}

interface ItineraryLayoverItem {
  type: "layover";
  travelDetails: undefined;
  layoverDetails: LayoverDetails;
}

export type ItineraryItemUnion = ItineraryTravelItem | ItineraryLayoverItem;
export type ItineraryItems = Array<ItineraryItemUnion>;

export function getItineraryItems(slice: OfferSlice): ItineraryItems {
  const numberOfSegments = slice.segments.length;
  const sliceDetailsStack: ItineraryItems = [];

  for (let index = 0; index < numberOfSegments; index++) {
    const currentSegment = slice.segments[index];
    const lastOnStack = sliceDetailsStack[sliceDetailsStack.length - 1] || {};
    const fareBrandName =
      "fare_brand_name" in slice ? slice.fare_brand_name : null;
    const travelDetails = getTravelItem(currentSegment, fareBrandName);

    const { departingAt } = getSegmentDates(currentSegment);
    if (lastOnStack.type === "travel") {
      if (numberOfSegments === 1) break;

      const duration = getDurationString(
        lastOnStack.travelDetails!.arrivingAt,
        departingAt!
      );

      sliceDetailsStack.push({
        type: "layover",
        travelDetails: undefined,
        layoverDetails: {
          airport: lastOnStack.travelDetails!.destination,
          duration,
          originDestinationKey: getLayoverOriginDestinationKey(
            lastOnStack.travelDetails?.origin.iata_code,
            lastOnStack.travelDetails?.destination.iata_code,
            currentSegment.destination?.iata_code
          ),
        },
      });
    }

    // We have to do this in a type-unsafe way for now because this union of offer and order segment
    // is not collapsible due to the lack of a discriminant field
    if (currentSegment.stops) {
      const stops: OfferSliceSegment["stops"] = currentSegment.stops;
      if (stops.length === 0) {
        sliceDetailsStack.push({
          type: "travel",
          id: currentSegment.id || "",
          travelDetails: travelDetails,
          layoverDetails: undefined,
        });
      } else {
        sliceDetailsStack.push(
          ...splitTravelDetailsWithStops(
            travelDetails,
            stops,
            currentSegment.id
          )
        );
      }
    } else {
      sliceDetailsStack.push({
        type: "travel",
        id: currentSegment.id || "",
        travelDetails: travelDetails,
        layoverDetails: undefined,
      });
    }
  }

  return sliceDetailsStack;
}

const getTravelItem = (
  fromSegment: OfferSliceSegment,
  fareBrandName: string | null
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
    aircraft: fromSegment.aircraft && fromSegment.aircraft.name,
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
        (baggage) => baggage.type === "carry_on"
      )?.quantity,
      checked: fromSegment.passengers?.[0].baggages?.find(
        (baggage) => baggage.type === "checked"
      )?.quantity,
    },
    originTerminal: fromSegment.origin_terminal,
    destinationTerminal: fromSegment.destination_terminal,
  };
};

const splitTravelDetailsWithStops = (
  travelDetails: TravelDetails<"offer">,
  stops: OfferSliceSegmentStop[],
  segmentId: string
): ItineraryItems => {
  const items: ItineraryItems = [];
  // split the travel details by the number of stops
  let nextOrigin = travelDetails.origin;
  let nextDepartingAt = travelDetails.departingAt;
  stops.forEach((stop, index) => {
    // add a travel item from the origin to this stop
    items.push({
      type: "travel",
      id: segmentId,
      layoverDetails: undefined,
      travelDetails: {
        ...travelDetails,
        originDestination: `${nextOrigin.iata_code}-${stop.airport.iata_code}`,
        departingAt: nextDepartingAt,
        arrivingAt: stop.arriving_at,
        origin: nextOrigin,
        destination: stop.airport,
        flightDuration: getDurationString(nextDepartingAt, stop.arriving_at),
      },
    });
    // show a stop as a layover item
    items.push({
      type: "layover",
      travelDetails: undefined,
      layoverDetails: {
        airport: stop.airport,
        duration: convertDurationToString(stop.duration),
        originDestinationKey: getLayoverOriginDestinationKey(
          nextOrigin.iata_code,
          stop.airport.iata_code,
          travelDetails.destination.iata_code
        ),
      },
    });
    // the stop becomes the next origin
    nextOrigin = stop.airport;
    nextDepartingAt = stop.departing_at;

    // if it's the last stop, add a travel item from the last stop to the segment's destination
    if (index === stops.length - 1) {
      items.push({
        type: "travel",
        id: segmentId,
        layoverDetails: undefined,
        travelDetails: {
          ...travelDetails,
          originDestination: `${stop.airport.iata_code}-${travelDetails.destination.iata_code}`,
          departingAt: stop.departing_at,
          arrivingAt: travelDetails.arrivingAt,
          origin: stop.airport,
          destination: travelDetails.destination,
          flightDuration: getDurationString(
            stop.departing_at,
            travelDetails.arrivingAt
          ),
        },
      });
    }
  });

  return items;
};
