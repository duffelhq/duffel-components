import {
  Offer,
  OfferAvailableCancelForAnyReasonServiceMetadata,
  OfferAvailableServiceBaggageMetadata,
} from "./Offer";

export interface CreateOrderPayload {
  selected_offers: Array<Offer["id"]>;
  passengers: CreateOrderPayloadPassengers;
  services: CreateOrderPayloadServices;
  payments: Array<CreateOrderPayloadPayment>;
  type: "instant";
  metadata: Record<string, string>;
}

export interface CreateOrderPayloadPassenger {
  id: string;
  given_name: string;
  family_name: string;
  gender: string;
  title: string;
  born_on: string;
  email: string;
  phone_number: string;
}

export type CreateOrderPayloadPassengers = Array<CreateOrderPayloadPassenger>;

export type CreateOrderPayloadPaymentType = "balance";

export interface CreateOrderPayloadPayment {
  type: CreateOrderPayloadPaymentType;
  amount: string;
  currency: string;
}

export type CreateOrderPayloadServices = CreateOrderPayloadService[];

export interface CreateOrderPayloadService {
  id: string;
  quantity: number;

  /** `serviceInformation` is meant for:
   * 1. internal use within the Duffel Ancillaries component, so it is convenient to augument selected services with data about it.
   * 2. When `onPayloadReady` is ready, we'll return selected bags and seat services along with the `serviceInformation` to allow consumer to enrich their price breakdown.
   *
   * Note: `serviceInformation` is not known by the Duffel API.
   */
  serviceInformation?: CreateOrderPayloadServiceInformation;
}

export interface CreateOrderPayloadSeatService {
  id: string;
  quantity: number;

  /** `serviceInformation` is meant for:
   * 1. internal use within the Duffel Ancillaries component, so it is convenient to augument selected services with data about it.
   * 2. When `onPayloadReady` is ready, we'll return selected bags and seat services along with the `serviceInformation` to allow consumer to enrich their price breakdown.
   *
   * Note: `serviceInformation` is not known by the Duffel API.
   */
  serviceInformation?: CreateOrderPayloadServiceInformationForSeats;
}

type CreateOrderPayloadServiceInformation =
  | CreateOrderPayloadServiceInformationForSeats
  | CreateOrderPayloadServiceInformationForBags
  | CreateOrderPayloadServiceInformationForCancelForAnyReason;

interface CreateOrderPayloadCommonServiceInformation {
  segmentId: string;
  passengerId: string;
  passengerName: string;
  total_amount: string;
  total_currency: string;
}

export interface CreateOrderPayloadServiceInformationForSeats
  extends CreateOrderPayloadCommonServiceInformation {
  type: "seat";
  designator: string;
  disclosures: string[];
}

export type CreateOrderPayloadServiceInformationForBags =
  CreateOrderPayloadCommonServiceInformation &
    OfferAvailableServiceBaggageMetadata;

type CreateOrderPayloadServiceInformationForCancelForAnyReason =
  OfferAvailableCancelForAnyReasonServiceMetadata &
    CreateOrderPayloadCommonServiceInformation & {
      type: "cancel_for_any_reason";
    };
