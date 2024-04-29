import { getAirlines } from "@components/DuffelNGSView/lib/getAirlines";

/* eslint-disable @typescript-eslint/no-var-requires */
const offerRequest = require("../../fixtures/offer-requests/orq_0000AgDHjHoX1SDBo07hdQ.json");
/* eslint-enable @typescript-eslint/no-var-requires */

describe("getAirlines", () => {
  test("correctly returns airlines", () => {
    const airlines = getAirlines(offerRequest);
    const iataCodes = airlines.map((airline) => airline.iata_code);

    // airline names should be alphabetized
    expect(iataCodes).toEqual(["AA", "ZZ", "B6", "WN"]);
  });
});
