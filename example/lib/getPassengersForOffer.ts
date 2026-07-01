import type { Offer } from "@duffel/api/types";
import type { ExamplePassengers } from "./types.ts";

export function getPassengersForOffer(offer: Offer): ExamplePassengers {
  const passenger = offer.passengers[0];

  if (passenger === undefined) {
    throw new Error("The selected offer does not have any passengers");
  }

  return [
    {
      id: passenger.id,
      given_name: "Mae",
      family_name: "Jemison",
      gender: "f",
      title: "dr",
      born_on: "1956-10-17",
      email: "m.jemison@nasa.gov",
      phone_number: "+16177562626",
    },
  ] as ExamplePassengers;
}
