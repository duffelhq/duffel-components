import {
  CreateOrder,
  CreateOrderService,
  Offer,
  OfferAvailableServiceBaggage,
  OfferAvailableServiceBaggageMetadata,
  OfferAvailableServiceCFAR,
  OfferAvailableServiceCFARMetadata,
  SeatMap,
  SeatMapCabinRowSectionAvailableService,
} from "@duffel/api/types";

export type DuffelAncillariesProps =
  | DuffelAncillariesPropsWithOfferIdForFixture
  | DuffelAncillariesPropsWithClientKeyAndOfferId
  | DuffelAncillariesPropWithOfferAndClientKey
  | DuffelAncillariesPropsWithOffersAndSeatMaps;

export interface DuffelAncillariesCommonProps {
  styles?: CustomStyles;
  onPayloadReady: OnPayloadReady;
  passengers: CreateOrder["passengers"];
  services: Ancillaries[];
  markup?: DuffelAncillariesMarkup;
  priceFormatters?: DuffelAncillariesPriceFormatters;
  debug?: boolean;
}

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
  cancel_for_any_reason?: DuffelAncillariesMarkupDefinition;
}

export type DuffelAncillariesPriceFormatterForBags = (
  amount: number,
  currency: string,
  service: OfferAvailableServiceBaggage,
) => { amount: number; currency?: string };

export type DuffelAncillariesPriceFormatterForSeats = (
  amount: number,
  currency: string,
  service: SeatMapCabinRowSectionAvailableService,
) => { amount: number; currency?: string };

export type DuffelAncillariesPriceFormatterForCancelForAnyReason = (
  amount: number,
  currency: string,
  service: OfferAvailableServiceCFAR,
) => { amount: number; currency?: string };

export interface DuffelAncillariesPriceFormatters {
  bags?: DuffelAncillariesPriceFormatterForBags;
  seats?: DuffelAncillariesPriceFormatterForSeats;
  cancel_for_any_reason?: DuffelAncillariesPriceFormatterForCancelForAnyReason;
}

export interface CustomStyles {
  accentColor?: string;
  buttonCornerRadius?: string;
  fontFamily?: string;
}

export type OnPayloadReady = (
  data: CreateOrder,
  metadata: OnPayloadReadyMetadata,
) => void;

export interface OnPayloadReadyMetadata {
  offer_total_amount: Offer["total_amount"];
  offer_total_currency: Offer["total_currency"];
  offer_tax_amount: Offer["tax_amount"];
  offer_tax_currency: Offer["tax_currency"];

  baggage_services: WithServiceInformation<CreateOrderService>[];
  seat_services: WithServiceInformation<CreateOrderService>[];
  cancel_for_any_reason_services: WithServiceInformation<CreateOrderService>[];
}

export type Ancillaries = "bags" | "seats" | "cancel_for_any_reason";

export type WithServiceInformation<TypeToExtend> = {
  serviceInformation: ServiceInformation;
} & TypeToExtend;

export type WithBaggageServiceInformation<TypeToExtend> = {
  serviceInformation: BaggageServiceInformation;
} & TypeToExtend;

export type WithSeatServiceInformation<TypeToExtend> = {
  serviceInformation: SeatServiceInformation;
} & TypeToExtend;

export type ServiceInformation =
  | BaggageServiceInformation
  | SeatServiceInformation
  | CancelForAnyReasonServiceInformation;

export interface BaggageServiceInformation
  extends OfferAvailableServiceBaggageMetadata {
  segmentIds: string[];
  passengerIds: string[];
  passengerName: string;
  total_amount: string;
  total_currency: string;
  designator?: undefined;
}

interface SeatServiceInformation {
  type: "seat";
  segmentId: string;
  passengerId: string;
  passengerName: string;
  designator: string;
  disclosures: string[];
  total_amount: string;
  total_currency: string;
}

interface CancelForAnyReasonServiceInformation
  extends OfferAvailableServiceCFARMetadata {
  type: "cancel_for_any_reason";
  segmentId?: undefined;
  sliceId?: undefined;
  total_amount: string;
  designator?: undefined;
  total_currency: string;
  passengerName?: undefined;
}
