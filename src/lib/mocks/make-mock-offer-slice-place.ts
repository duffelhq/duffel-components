import { Place } from "../../types/Place";
import { makeMockCity } from "./make-mock-city";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): Place =>
    ({
      id: `arp_${(seedId++).toString().padStart(5, "0")}`,
      iata_code: "LHR",
      name: "Heathrow Airport",
      iata_country_code: "GB",
      latitude: 51.47,
      longitude: -0.4543,
      icao_code: "EGLL",
      time_zone: "Europe/London",
      iata_city_code: "LON",
      type: "airport",
      city_name: "London",
      city: makeMockCity(),
      // TODO come back and fix this type
    } as any);
})();

export const makeMockOfferSlicePlace = (
  extendDefault?: Partial<Place>
): Place => Object.assign({}, getDefaultObject(), extendDefault || {});
