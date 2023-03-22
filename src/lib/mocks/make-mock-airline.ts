import { Airline } from "../../types/Airline";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): Airline => ({
    id: `arl_${(seedId++).toString().padStart(5, "0")}`,
    iata_code: "AA",
    name: "American Airlines",
  });
})();

export const makeMockAirline = (extendDefault?: Partial<Airline>): Airline =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
