import { Airline } from "./Airline";
import { Airport } from "./Airport";
import { Aircraft } from "./Aircraft";
import { City } from "./City";

export const CabinClassMap = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
  any: "Any",
};
export type CabinClass = keyof typeof CabinClassMap;

export type PassengerIdentityDocumentType = "passport";
/**
 * Each offer represents flights you can buy from an airline at a particular price that meet your search criteria.
 */

export type PaymentType = "arc_bsp_cash" | "balance" | "payments" | "card";
export type BaggageType = "carry_on" | "checked";

export const PassengerTypeMap = {
  adult: "Adult",
  child: "Child",
  infant_without_seat: "Infant",
};

export type PassengerType = keyof typeof PassengerTypeMap;
export type PlaceType = "airport" | "city";

export interface PaymentRequirements {
  /**
   * The ISO 8601 datetime by which you must pay for this offer. At this
   * time, if still unpaid, the reserved space on the flight(s) will be
   * released and you will have to create a new order. This will be `null`
   * when the offer requires immediate payment - that is, when
   * `requires_instant_payment` is `true`.
   *
   * @example
   * "2020-01-17T10:42:14Z"
   */
  payment_required_by?: string | null;

  /**
   * The ISO 8601 datetime at which the price associated with the order will
   * no longer be guaranteed by the airline and may change before payment.
   * This will be null when `requires_instant_payment` is `true`.
   *
   * @example
   * "2020-01-17T10:42:14"
   */
  price_guarantee_expires_at?: string | null;

  /**
   * When payment is required at the time of booking this will be `true` and
   * `payment_required_by` and `price_guarantee_expires_at` will be `null`.
   * When payment can be made at a time after booking, this will be false
   * and the time limits on the payment will be provided in
   * `payment_required_by` and `price_guarantee_expires_at`.
   */
  requires_instant_payment: boolean;
}

export interface OfferAvailableServiceCommon {
  /**
   * Duffel's unique identifier for the service.
   *
   * @example
   * "ase_00009UhD4ongolulWd9123"
   */
  id: string;

  /**
   * The maximum quantity of this service that can be booked with an order.
   *
   * @example
   * 1
   */
  maximum_quantity: number;

  /**
   * The list of passenger `id`s the service applies to. If you add this
   * service to an order it will apply to all the passengers in this list.
   * For services where the type is `baggage`, this list will include only a
   * single passenger.
   *
   * @example
   * ["pas_00009hj8USM7Ncg31cBCLL"]
   */
  passenger_ids: string[];

  /**
   * The list of segment `id`s the service applies to. If you add this
   * service to an order it will apply to all the segments in this list. For
   * services where the type is `baggage`, depending on the airline, this
   * list includes all the segments of all slices or all the segments of a
   * single slice.
   *
   * @example
   * ["seg_00009hj8USM7Ncg31cB456"]
   */
  segment_ids: string[];

  /**
   * The total price of the service for all passengers and segments it
   * applies to, including taxes. This price is for a single unit of the
   * service.
   *
   * @example
   * "15.00"
   */
  total_amount: string;

  /**
   * The currency of the `totalAmount`, as an ISO 4217 currency code.
   */
  total_currency: string;
}

export interface OfferAvailableServiceBaggageMetadata {
  /**
   * The maximum depth that the baggage can have in centimetres
   *
   * @example
   * 75
   */
  maximum_depth_cm: number | null;

  /**
   * The maximum height that the baggage can have in centimetres
   *
   * @example
   * 90
   */
  maximum_height_cm: number | null;

  /**
   * The maximum length that the baggage can have in centimetres
   *
   * @example
   * 90
   */
  maximum_length_cm: number | null;

  /**
   * The maximum weight that the baggage can have in kilograms
   *
   * @example
   * 23
   */
  maximum_weight_kg: number | null;

  /**
   * The type of the baggage
   */
  type: BaggageType;
}

export interface OfferAvailableServiceBaggage
  extends OfferAvailableServiceCommon {
  /**
   * The metadata varies by the type of service. It includes further data
   * about the service. For example, for baggages, it may have data about
   * size and weight restrictions.
   */
  metadata: OfferAvailableServiceBaggageMetadata;

  /**
   * The type of the service.
   */
  type: "baggage";
}

export interface Offer {
  /**
   * The types of identity documents that may be provided for the passengers when creating an order based on this offer.
   * Currently, the only supported type is `passport`. If this is `[]`, then you must not provide identity documents.
   */
  allowed_passenger_identity_document_types: PassengerIdentityDocumentType[];

  /**
   * The services that can be booked along with the offer but are not included by default, for example an additional checked bag.
   * This field is only returned in the Get single offer endpoint.
   * When there are no services available, or we don't support services for the airline, this list will be empty.
   */
  available_services: Array<
    OfferAvailableBaggageService | OfferAvailableCancelForAnyReasonService
  >;

  /**
   * The base price of the offer for all passengers, excluding taxes.
   * It does not include the base amount of any service(s) that might be booked with the offer.
   */
  base_amount: string;

  /**
   * The currency of the `base_amount`, as an ISO 4217 currency code
   */
  base_currency: string;

  /**
   * The ISO 8601 datetime at which the offer was created
   */
  created_at: string;

  /**
   * The ISO 8601 datetime at which the offer will expire and no longer be usable to create an order
   */
  expires_at: string;

  /**
   * Duffel's unique identifier for the offer
   */
  id: string;

  /**
   * Whether the offer request was created in live mode.
   * This field will be set to `true` if the offer request was created in live mode, or `false` if it was created in test mode.
   */
  live_mode: boolean;

  /**
   * The airline which provided the offer
   */
  owner: Airline;

  /**
   * Whether the offer is a partial offer
   */
  partial?: boolean;

  /**
   * Whether identity documents must be provided for each of the passengers when creating an order based on this offer.
   * If this is `true`, you must provide an identity document for every passenger.
   */
  passenger_identity_documents_required: boolean;

  /**
   * The passengers included in the offer
   */
  passengers: OfferPassenger[];

  /**
   * The payment requirements for this offer.
   */
  payment_requirements: PaymentRequirements;

  /**
   * The private fares applied on this offer.
   */
  private_fares: OfferPrivateFare[];

  /**
   * The slices that make up this offer. Each slice will include one or more segments,
   * the specific flights that the airline is offering to take the passengers from the slice's `origin` to its `destination`.
   */
  slices: OfferSlice[];

  /**
   * The amount of tax payable on the offer for all passengers
   */
  tax_amount: string | null;

  /**
   * The currency of the `tax_amount`, as an ISO 4217 currency code
   */
  tax_currency: string | null;

  /**
   * The total price of the offer for all passengers, including taxes.
   * It does not include the total price of any service(s) that might be booked with the offer.
   */
  total_amount: string;

  /**
   * An estimate of the total carbon dioxide (CO₂) emissions when
   * all of the passengers fly this offer's itinerary, measured in kilograms
   */
  total_emissions_kg: string;

  /**
   * The currency of the `total_amount`, as an ISO 4217 currency code
   */
  total_currency: string;

  /**
   * List of supported payment types
   */
  available_payment_types: PaymentType[];

  /**
   * The conditions associated with this offer
   */
  conditions: {
    /**
     * Whether the whole offer can be changed before the departure of the
     * first slice. If the airline hasn't provided any information about
     * whether this offer can be changed then this property will be `null`.
     */
    change_before_departure: OfferCondition | null;

    /**
     * Whether the whole offer can be refunded before the departure of the
     * first slice. If the airline hasn't provided any information about
     * whether this offer can be refunded then this property will be `null`.
     */
    refund_before_departure: OfferCondition | null;
  };

  /* A client key to be used with https://github.com/duffelhq/duffel-checkout */
  client_key: string;
}

export interface OfferPassenger {
  /**
   * The age of the passenger on the departure_date of the final slice.
   *
   * @example
   * 14
   */
  age: number;

  /**
   * The passenger's family name. Only `space`, `-`, `'`, and letters from
   * the `ASCII`, `Latin-1 Supplement` and `Latin Extended-A` (with the
   * exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, and `ð`) Unicode
   * charts are accepted. All other characters will result in a validation
   * error. The minimum length is 1 character, and the maximum is 20
   * characters.
   *
   * This is only required if you're also including Loyalty Programme
   * Accounts.
   *
   * @example
   * "Earhart"
   */
  family_name: string | null;

  /**
   * The passenger's given name. Only `space`, `-`, `'`, and letters from
   * the `ASCII`, `Latin-1 Supplement` and `Latin Extended-A` (with the
   * exceptions of `Æ`, `æ`, `Ĳ`, `ĳ`, `Œ`, `œ`, `Þ`, and `ð`) Unicode
   * charts are accepted. All other characters will result in a validation
   * error. The minimum length is 1 character, and the maximum is 20
   * characters.
   *
   * This is only required if you're also including Loyalty Programme
   * Accounts.
   *
   * @example
   * "Amelia"
   */
  given_name: string | null;

  /**
   * The identifier for the passenger. This ID will be generated by Duffel.
   *
   * @example
   * "pas_00009hj8USM7Ncg31cBCLx"
   */
  id: string;

  /**
   * The Loyalty Programme Accounts for this passenger.
   */
  loyalty_programme_accounts?: LoyaltyProgrammeAccount[];

  /**
   * The type of the passenger.
   */
  type: PassengerType;
}

export interface LoyaltyProgrammeAccount {
  /**
   * The passenger's account number for this Loyalty Programme Account
   */
  account_number: string;

  /**
   * The IATA code for the airline that this Loyalty Programme Account belongs to
   */
  airline_iata_code: string;
}

export interface OfferPrivateFare {
  /**
   * The corporate code that was applied, if any.
   */
  corporate_code?: string;

  /**
   * The tracking reference that was applied, if any.
   */
  tracking_reference?: string;

  /**
   * The type of private fare applied.
   */
  type: "corporate" | "leisure" | "negotiated";
}

export interface OfferSlice {
  /**
   * The options and conditions to change or cancel this slice. Only
   * "changing before departure" is allowed.
   */
  conditions: {
    /**
     * Whether this slice can be changed before the departure. If the slice
     * can be changed for all of the passengers then the allowed property
     * will be `true` and information will be provided about any penalties. If
     * none of the passengers on the slice can be changed then the allowed
     * property will be `false`. In all other cases this property will be
     * `null`indicating we can't provide the information for this slice.
     */
    change_before_departure: OfferCondition | null;
  };

  /**
   * The city or airport where this slice ends.
   */
  destination: OfferSlicePlace;

  /**
   * The type of the destination.
   */
  destination_type: PlaceType;

  /**
   * The duration of the slice, represented as a ISO 8601 duration.
   *
   * @example
   * "PT02H26M"
   */
  duration: string | null;

  /**
   * The name of the fare brand associated with this slice. A fare brand
   * specifies the travel conditions you get on your slice made available by
   * the airline. e.g. a British Airways Economy Basic fare will only
   * include a hand baggage allowance. It is worth noting that the fare
   * brand names are defined by the airlines themselves and therefore they
   * are subject to change without any prior notice. We are in the process
   * of adding support for `fare_brand_name` across all our airlines, so for
   * now, this field may be `null` in some offers. This will become a
   * non-nullable attribute in the near future.
   *
   * @example
   * "Basic"
   */
  fare_brand_name: string | null;

  /**
   * Duffel's unique identifier for the slice. It identifies the slice of
   * an offer (i.e. the same slice across offers will have different `id`s).
   *
   * @example
   * "sli_00009htYpSCXrwaB9Dn123"
   */
  id: string;

  /**
   * The city or airport where this slice begins.
   */
  origin: OfferSlicePlace;

  /**
   * The type of the origin
   */
  origin_type: PlaceType;

  /**
   * The segments - that is, specific flights - that the airline is offering
   * to get the passengers from the `origin` to the `destination`
   */
  segments: OfferSliceSegment[];
}

export interface OfferSlicePlace {
  /**
   * The 3-letter IATA code for the city where the place is located.
   * Only present for airports which are registered with IATA as belonging to a [metropolitan area](https://portal.iata.org/faq/articles/en_US/FAQ/How-do-I-create-a-new-Metropolitan-Area).
   */
  iata_city_code: string | null;

  /**
   * The 3-letter IATA code for the place
   */
  iata_code: string;

  /**
   * Duffel's unique identifier for the place
   */
  id: string;

  /**
   * The name of the place
   */
  name: string;

  /**
   * The type of the place
   */
  type: PlaceType;

  /**
   * The ISO 3166-1 alpha-2 code for the country where the city is located
   */
  iata_country_code: string;

  /**
   * The latitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -90° and 90°
   */
  latitude: number | null;

  /**
   * The longitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -180° and 180°
   */
  longitude: number | null;

  /**
   * The four-character ICAO code for the airport
   */
  icao_code: string | null;

  /**
   * The time zone of the airport, specified by name from the [tz database](https://en.wikipedia.org/wiki/Tz_database)
   */
  time_zone: string | null;

  /**
   * The name of the city (or cities separated by a `/`) where the airport is located
   */
  city_name: string | null;

  /**
   * The metropolitan area where the airport is located.
   * Only present for airports which are registered with IATA as belonging to a metropolitan area.
   */
  city: City;
}

export interface OfferSliceSegment {
  /**
   * The aircraft that the operating carrier will use to operate this segment
   */
  aircraft: Aircraft;

  /**
   * The ISO 8601 datetime at which the segment is scheduled to arrive
   */
  arriving_at: string;

  /**
   * The terminal at the destination airport where the segment is scheduled to arrive
   */
  destination_terminal: string | null;

  /**
   * The ISO 8601 datetime at which the segment is scheduled to depart
   */
  departing_at: string;

  /**
   * The terminal at the origin airport from which the segment is scheduled to depart
   */
  origin_terminal: string | null;

  /**
   * The airport at which the segment is scheduled to arrive
   */
  destination: Airport;

  /**
   * The distance of the segment in kilometres
   */
  distance: string | null;

  /**
   * The duration of the segment, represented as a ISO 8601 duration
   */
  duration: string | null;

  /**
   * Duffel's unique identifier for the segment. It identifies the segment of an offer (i.e. the same segment across offers will have different `id`s
   */
  id: string;

  /**
   * The airline selling the tickets for this segment.
   * This may differ from the `operating_carrier` in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  marketing_carrier: Airline;

  /**
   * The flight number assigned by the marketing carrier
   */
  marketing_carrier_flight_number: string;

  /**
   * The airport from which the flight is scheduled to depart
   */
  origin: Airport;

  /**
   * The airline actually operating this segment.
   * This may differ from the marketing_carrier in the case of a "codeshare", where one airline sells flights operated by another airline.
   */
  operating_carrier: Airline;

  /**
   * The flight number assigned by the operating carrier
   */
  operating_carrier_flight_number?: string;

  /**
   * Additional segment-specific information about the passengers included in the offer (e.g. their baggage allowance and the cabin class they will be travelling in)
   */
  passengers: OfferSliceSegmentPassenger[];

  /**
   * Additional segment-specific information about the stops, if any, included in the segment
   */
  stops: OfferSliceSegmentStop[];
}

export interface OfferConditionModificationAllowed {
  /**
   * Allow the modification to the order
   */
  allowed: true;
  /**
   * The penalty of the modification
   */
  penalty_amount: number | null;
  /**
   * The penalty currency of the modification
   */
  penalty_currency: string | null;
}

export interface OfferConditionNoModification {
  /**
   * No modification to the order is allowed
   */
  allowed: false;
  /**
   * When the modification to the order is not allowed, both penalty amount and currency should be null
   */
  penalty_amount: null;
  penalty_currency: null;
}

export type OfferCondition =
  | OfferConditionModificationAllowed
  | OfferConditionNoModification;

export interface OfferSliceSegmentPassenger {
  /**
   * The baggage allowances for the passenger on this segment included in the offer.
   * Some airlines may allow additional baggage to be booked as a service - see the offer's available_services.
   */
  baggages: OfferSliceSegmentPassengerBaggage[];

  /**
   * The cabin class that the passenger will travel in on this segment
   */
  cabin_class: CabinClass;

  /**
   * The name that the marketing carrier uses to market this cabin class
   */
  cabin_class_marketing_name: string;

  /**
   * The identifier for the passenger.
   * You may have specified this ID yourself when creating the offer request, or otherwise, Duffel will have generated its own random ID.
   */
  passenger_id: string;
}

export interface OfferSliceSegmentPassengerBaggage {
  /**
   * The type of the baggage allowance
   */
  type: BaggageType;

  /**
   * The number of this type of bag allowed on the segment. Note that this can currently be 0 in some cases.
   */
  quantity: number;
}

export interface OfferSliceSegmentStop {
  /**
   * Duffel's unique identifier for the Stop
   */
  id: string;

  /**
   * The airport at which the Stop happens
   */
  airport: Airport;

  /**
   * The ISO 8601 datetime at which the Stop is scheduled to arrive, in the airport's timezone (see destination.timezone)
   */
  arriving_at: string;

  /**
   * The ISO 8601 datetime at which the Stop is scheduled to depart, in the airport's timezone (see origin.timezone)
   */
  departing_at: string;

  /**
   * The duration of the Stop, represented as a ISO 8601 duration
   */
  duration: string;
}

export interface LayoutSelectionPassenger {
  id: string;
  name?: string | null;
}

export interface OfferAvailableServiceSeatMetadata {
  /**
   * The designator used to uniquely identify the seat, usually made up of a row number and a column letter
   */
  designator: string;

  /**
   * Each disclosure is text, in English, provided by the airline that describes the terms and conditions of this seat. We recommend showing this in your user interface to make sure that customers understand any restrictions and limitations.
   */
  disclosures: string[];

  /**
   * A name which describes the type of seat, which you can display in your user interface to help customers to understand its features
   */
  name: string;
}

export type OfferAvailableService =
  | OfferAvailableBaggageService
  | OfferAvailableCancelForAnyReasonService;

interface OfferAvailableServiceBase {
  /**
   * Duffel's unique identifier for the service
   */
  id: string;

  /**
   * The maximum quantity of this service that can be booked with an order
   */
  maximum_quantity: number;

  /**
   * The list of passenger `id`s the service applies to.
   * If you add this service to an order it will apply to all the passengers in this list.
   * For services where the type is `baggage`, this list will include only a single passenger.
   */
  passenger_ids: string[];

  /**
   * The list of segment ids the service applies to.
   * If you add this service to an order it will apply to all the segments in this list.
   * For services where the type is baggage, depending on the airline,
   * this list includes all the segments of all slices or all the segments of a single slice.
   */
  segment_ids: string[];

  /**
   * The total price of the service for all passengers and segments it applies to, including taxes
   */
  total_amount: string;

  /**
   * The currency of the `total_amount`, as an ISO 4217 currency code
   */
  total_currency: string;
}

export interface OfferAvailableBaggageService
  extends OfferAvailableServiceBase {
  /**
   * An object containing metadata about the service, like the maximum weight and dimensions of the baggage.
   */
  metadata: OfferAvailableServiceBaggageMetadata;

  /**
   * The type of the service.
   * For now we only return services of type baggage but we will return other types in the future.
   * We won't consider adding new service types a break change.
   */
  type: "baggage";
}

export interface OfferAvailableCancelForAnyReasonService
  extends OfferAvailableServiceBase {
  /**
   * An object containing metadata about the service, like the refund amount when cancelling.
   */
  metadata: OfferAvailableCancelForAnyReasonServiceMetadata;

  /**
   * The type of the service.
   * For now we only return services of type baggage but we will return other types in the future.
   * We won't consider adding new service types a break change.
   */
  type: "cancel_for_any_reason";
}

export interface OfferAvailableSeatService extends OfferAvailableServiceBase {
  /**
   * An object containing metadata about the service, like the maximum weight and dimensions of the baggage.
   */
  metadata: OfferAvailableServiceSeatMetadata;

  /**
   * The type of the service.
   * For now we only return services of type baggage but we will return other types in the future.
   * We won't consider adding new service types a break change.
   */
  type: "seats";
}

export interface OfferAvailableCancelForAnyReasonServiceMetadata {
  /**
   * The URL where you can find the terms and conditions for this CFAR service
   */
  terms_and_conditions_url: string;

  /**
   * The amount of money that will be returned
   */
  refund_amount: string;

  /**
   * Details of what this CFAR service entails and how it can be used
   */
  merchant_copy: string;
}

export type OfferAvailableServiceType = OfferAvailableService["type"];

export type OfferAvailableServiceMetadata =
  | OfferAvailableServiceBaggageMetadata
  | OfferAvailableServiceSeatMetadata;
