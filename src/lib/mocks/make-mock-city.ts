import { City } from "../../types/City";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): City => ({
    id: `cit_${(seedId++).toString().padStart(5, "0")}`,
    iata_code: "LON",
    iata_country_code: "GB",
    name: "London",
  });
})();

export const makeMockCity = (extendDefault?: Partial<City>): City =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
