import { Airport } from "../../types/Airport";
import { makeMockCity } from "./make-mock-city";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): Airport => ({
    id: `arp_${(seedId++).toString().padStart(5, "0")}`,
    iata_code: "LHR",
    name: "Heathrow Airport",
    iata_country_code: "GB",
    latitude: 51.47,
    longitude: -0.4543,
    icao_code: "EGLL",
    time_zone: "Europe/London",
    city_name: "London",
    city: makeMockCity(),
  });
})();

export const makeMockAirport = (extendDefault?: Partial<Airport>): Airport =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
