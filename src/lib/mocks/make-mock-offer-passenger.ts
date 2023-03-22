import { OfferPassenger } from "../../types/Offer";

const getDefaultObject = (() => {
  let seedId = 0;
  return (): OfferPassenger =>
    ({
      id: `pas_${(++seedId).toString().padStart(5, "0")}`,
      type: "adult",
      // TODO come back and fix this type
    } as any);
})();

export const makeMockOfferPassenger = (
  extendDefault?: Partial<OfferPassenger>
): OfferPassenger => Object.assign({}, getDefaultObject(), extendDefault || {});
