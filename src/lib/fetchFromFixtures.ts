import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";

export const importFromOfferFixtures = (offerId: string): Promise<Offer> =>
  import(`/fixtures/offers/${offerId}.js`).then(({ offer }) => offer);

export const importFromSeatMapsFixtures = (
  offerId: string
): Promise<SeatMap[]> =>
  import(`/fixtures/seat-maps/${offerId}.js`).then(({ seatMaps }) => seatMaps);
