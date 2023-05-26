import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "./CreateOrderPayload";
import { Offer, OfferAvailableServiceBaggage } from "./Offer";
import { SeatMap, SeatMapCabinRowSectionAvailableService } from "./SeatMap";

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

export type DuffelAncillariesMarkupDefinition = {
  rate: number;
  amount: number;
};

export interface DuffelAncillariesMarkup {
  bags?: DuffelAncillariesMarkupDefinition;
  seats?: DuffelAncillariesMarkupDefinition;
}

export type DuffelAncillariesPriceFormatterBags = (
  amount: number,
  currency: string,
  service: OfferAvailableServiceBaggage
) => { amount: number; currency: string };

export type DuffelAncillariesPriceFormatterSeats = (
  amount: number,
  currency: string,
  service: SeatMapCabinRowSectionAvailableService
) => { amount: number; currency: string };

export interface DuffelAncillariesPriceFormatters {
  bags?: DuffelAncillariesPriceFormatterBags;
  seats?: DuffelAncillariesPriceFormatterSeats;
}

export interface DuffelAncillariesCommonProps {
  styles?: CustomStyles;
  onPayloadReady: OnPayloadReady;
  passengers: CreateOrderPayload["passengers"];
  services: Ancillaries[];
  markup?: DuffelAncillariesMarkup;
  priceFormatters?: DuffelAncillariesPriceFormatters;
}

export interface CustomStyles {
  accentColor: string;
  buttonCornerRadius: string;
  fontFamily: string;
}

export type OnPayloadReady = (
  data: CreateOrderPayload,
  metadata: OnPayloadReadyMetadata
) => void;

export interface OnPayloadReadyMetadata {
  offer_total_amount: Offer["total_amount"];
  offer_total_currency: Offer["total_currency"];
  offer_tax_amount: Offer["tax_amount"];
  offer_tax_currency: Offer["tax_currency"];

  baggage_services: CreateOrderPayloadServices;
  seat_services: CreateOrderPayloadServices;
}

const bags = "bags" as const;
const seats = "seats" as const;
export type Ancillaries = typeof bags | typeof seats;
