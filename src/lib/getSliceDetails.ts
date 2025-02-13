import { OfferSlice, OfferSliceSegment, OrderSlice } from "@duffel/api/types";
import {
  SliceDetails,
  SliceItem,
  TravelDetails,
} from "src/types/TravelDetails";
import { convertDurationToString } from "./convertDurationToString";
import { getDurationString } from "./getDurationString";
import { getTravelItem } from "./getTravelItem";
import { getSegmentDates } from "./getSegmentDates";
import { getLayoverOriginDestinationKey } from "./getLayoverOriginDestinationKey";

export const getSliceDetails = (
  slice: OfferSlice | OrderSlice | undefined,
): SliceDetails => {
  if (!slice) return [];

  const numberOfSegments = slice.segments.length;
  const sliceDetailsStack = new Array<SliceItem>();

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
        departingAt!,
      );

      sliceDetailsStack.push({
        type: "layover",
        layoverDetails: {
          airport: lastOnStack.travelDetails!.destination,
          duration,
          originDestinationKey: getLayoverOriginDestinationKey(
            lastOnStack.travelDetails?.origin.iata_code,
            lastOnStack.travelDetails?.destination.iata_code,
            currentSegment.destination?.iata_code,
          ),
        },
      });
    }

    // We have to do this in a type-unsafe way for now because this union of offer and order segment
    // is not collapsible due to the lack of a discriminant field
    if ("stops" in currentSegment && currentSegment.stops) {
      const stops: OfferSliceSegment["stops"] = currentSegment.stops;
      if (stops.length === 0) {
        sliceDetailsStack.push({
          type: "travel",
          id: currentSegment.id || "",
          travelDetails: travelDetails,
        });
      } else {
        sliceDetailsStack.push(
          ...splitTravelDetailsWithStops(
            travelDetails,
            stops,
            currentSegment.id,
          ),
        );
      }
    } else {
      sliceDetailsStack.push({
        type: "travel",
        id: currentSegment.id || "",
        travelDetails: travelDetails,
      });
    }
  }

  return sliceDetailsStack;
};

const splitTravelDetailsWithStops = (
  travelDetails: TravelDetails<"offer">,
  stops: OfferSliceSegment["stops"],
  segmentId: string,
): SliceItem[] => {
  const items: SliceItem[] = [];
  // split the travel details by the number of stops
  let nextOrigin = travelDetails.origin;
  let nextDepartingAt = travelDetails.departingAt;
  stops.forEach((stop, index) => {
    // add a travel item from the origin to this stop
    items.push({
      type: "travel",
      id: segmentId,
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
      layoverDetails: {
        airport: stop.airport,
        duration: convertDurationToString(stop.duration),
        originDestinationKey: getLayoverOriginDestinationKey(
          nextOrigin.iata_code,
          stop.airport.iata_code,
          travelDetails.destination.iata_code,
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
        travelDetails: {
          ...travelDetails,
          originDestination: `${stop.airport.iata_code}-${travelDetails.destination.iata_code}`,
          departingAt: stop.departing_at,
          arrivingAt: travelDetails.arrivingAt,
          origin: stop.airport,
          destination: travelDetails.destination,
          flightDuration: getDurationString(
            stop.departing_at,
            travelDetails.arrivingAt,
          ),
        },
      });
    }
  });

  return items;
};
