import { Offer } from "src/types/Offer";
import { SeatMap } from "src/types/SeatMap";

export const fetchFromMockOffers = (offerId: string): Promise<Offer> =>
  import(`/mocks/offers/${offerId}.js`).then(({ offer }) => offer);

export const fetchFromMockSeatMaps = (offerId: string): Promise<SeatMap[]> =>
  import(`/mocks/seat-maps/${offerId}.js`).then(({ seatMaps }) => seatMaps);
