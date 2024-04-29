import { OfferRequest } from "@duffel/api/booking/OfferRequests/OfferRequestsTypes";
import { Filters } from "./filter-results";
import { getAirlines } from "./getAirlines";

export function getInitialFilterValues(offerRequest: OfferRequest): Filters {
  return {
    airlines: getAirlines(offerRequest),
    stops: "any",
    times: {
      departure: [0, 1440],
      arrival: [0, 1440],
    },
  };
}
