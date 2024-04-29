import { OfferRequest } from "@duffel/api/types";
import { Filters } from "./filter-results";

export function getAirlines(offerRequest: OfferRequest): Filters["airlines"] {
  const airlines: Filters["airlines"] = [];
  const insertedAirlines = new Set<string>();

  for (const offer of offerRequest.offers) {
    const owner = offer.owner;
    if (owner.iata_code === null) continue;

    if (!insertedAirlines.has(owner.iata_code)) {
      airlines.push({
        iata_code: owner.iata_code,
        name: owner.name,
      });
      insertedAirlines.add(owner.iata_code);
    }
  }
  return airlines.sort((a, b) => a.name.localeCompare(b.name));
}
