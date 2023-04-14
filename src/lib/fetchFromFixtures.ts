import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";

const COMPONENT_CDN = process.env.COMPONENT_CDN;

export const importFromOfferFixtures = async (
  offerId: string
): Promise<Offer> =>
  await (
    await fetch(COMPONENT_CDN + `/fixtures/offers/${offerId}.json`)
  ).json();

export const importFromSeatMapsFixtures = async (
  offerId: string
): Promise<SeatMap[]> =>
  await (
    await fetch(COMPONENT_CDN + `/fixtures/seat-maps/${offerId}.json`)
  ).json();
