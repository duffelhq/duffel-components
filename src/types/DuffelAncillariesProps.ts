import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "./CreateOrderPayload";
import { Offer } from "./Offer";
import { SeatMap } from "./SeatMap";

export type DuffelAncillariesProps =
  | DuffelAncillariesPropsWithOfferIdForFixture
  | DuffelAncillariesPropsWithClientKeyAndOfferId
  | DuffelAncillariesPropWithOfferAndClientKey
  | DuffelAncillariesPropsWithOffersAndSeatMaps;

export interface DuffelAncillariesPropsWithOfferIdForFixture
  extends DuffelAncillariesCommonProps {
  offer_id: `fixture_${string}`;
}

export interface DuffelAncillariesPropsWithClientKeyAndOfferId
  extends DuffelAncillariesCommonProps {
  offer_id: string;
  client_key: string;
}

export interface DuffelAncillariesPropWithOfferAndClientKey
  extends DuffelAncillariesCommonProps {
  offer: Offer;
  client_key: string;
}

export interface DuffelAncillariesPropsWithOffersAndSeatMaps
  extends DuffelAncillariesCommonProps {
  offer: Offer;
  seat_maps: SeatMap[];
}

export interface DuffelAncillariesCommonProps {
  styles?: CustomStyles;
  onPayloadReady: OnPayloadReady;
  passengers: CreateOrderPayload["passengers"];
}

export interface CustomStyles {
  accentColor: string;
  buttonCornerRadius: string;
  fontFamily: string;
}

export type OnPayloadReady = (
  data: CreateOrderPayload,
  metadata: OnPayloadReadyMetada
) => void;

export interface OnPayloadReadyMetada {
  baggageServices: CreateOrderPayloadServices;
  seatServices: CreateOrderPayloadServices;
}

// This can be a setting we expose to the user later
const bags = "bags" as const;
const seats = "seats" as const;
export type Ancillaries = typeof bags | typeof seats;
