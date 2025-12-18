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

  /**
   * If you pass default selected baggage services, they will be used to initiate the state when the component mounts. Any further updates will be ignored.
   */
  defaultBaggageSelectedServices?: WithBaggageServiceInformation<CreateOrderService>[];

  /**
   * If you pass default selected seat services, they will be used to initiate the state when the component mounts. Any further updates will be ignored.
   */
  defaultSeatSelectedServices?: WithSeatServiceInformation<CreateOrderService>[];

  /**
   * You can use this prop to change some of the strings used in the component so it
   * can be localised to the user's language.
   */
  localisationStrings?: DuffelAncillariesLocalisationStrings;
}

export interface DuffelAncillariesPropsWithOfferIdForFixture
  extends DuffelAncillariesCommonProps {
  /**
   * @deprecated The offer_id is deprecated. Instead fetch the offer and seat maps and pass them to the component as props.
   */
  offer_id: `fixture_${string}`;
}

export interface DuffelAncillariesPropsWithClientKeyAndOfferId
  extends DuffelAncillariesCommonProps {
  /**
   * @deprecated The `offer_id` is deprecated. Instead fetch the offer and seat maps and pass them to the component as props.
   */
  offer_id: string;

  /**
   * @deprecated The `client_key` is deprecated. Instead fetch the offer and seat maps and pass them to the component as props.
   */
  client_key: string;
}

export interface DuffelAncillariesPropWithOfferAndClientKey
  extends DuffelAncillariesCommonProps {
  offer: Offer;

  /**
   * @deprecated The `client_key` is deprecated. Instead fetch the offer and seat maps and pass them to the component as props.
   */
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

export interface DuffelAncillariesLocalisationStrings {
  /**
   *  Use this to localise the maximum baggage dimensions.
   *
   *  For example, if you want to localise the baggage dimensions from centimeters to inches, you may use:
   *
   * ```js
   * (heightInCentimeters, lengthInCentimeters, depthInCentimeters) =>
   *   `${heightInCentimeters * CM_TO_INCHES} x ${lengthInCentimeters * CM_TO_INCHES} x ${depthInCentimeters * CM_TO_INCHES} in`
   * ```
   */
  baggageMaximumDimensions?: (
    heightInCentimeters: number,
    lengthInCentimeters: number,
    depthInCentimeters: number,
  ) => string;

  /**
   *  Use this to localise the maximum baggage weight.
   *
   *  For example, if you want to localise the baggage weight from kilograms to pounds, you may use:
   *
   * ```js
   * (weightInKilograms: number) => `${weightInKilograms * KG_TO_POUNDS} lbs`
   * ```
   */
  baggageMaximumWeight?: (weightInKilograms: number) => string;
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
