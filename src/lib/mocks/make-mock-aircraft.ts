import { Aircraft } from "../../types/Aircraft";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): Aircraft => ({
    id: `arc_${(seedId++).toString().padStart(5, "0")}`,
    iata_code: "380",
    name: "Airbus A380",
  });
})();

export const makeMockAircraft = (extendDefault?: Partial<Aircraft>): Aircraft =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
