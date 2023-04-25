import { Offer } from "./Offer";

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

  /** _INTERNAL_metadata is meant for internal use within the Duffel Ancillaries component.
   * It is convenient so we can augument services with data about it.
   * It is not meant to be used by the client and it is deleted
   * before the payload is sent to the onPayloadReady callback.
   * This is not to be confused with `OnPayloadReadyMetada` which is meant for the client.
   */
  _internalMetadata?: CreateOrderPayloadServiceInternalMetadata;
}

interface CreateOrderPayloadServiceInternalMetadata {
  segmentId?: string;
  passengerId?: string;
  passengerName?: string;
  designator?: string;
}
