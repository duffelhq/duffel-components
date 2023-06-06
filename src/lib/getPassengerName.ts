import { CreateOrderPayloadPassenger } from "../types/CreateOrderPayload";
import { OfferPassenger } from "../types/Offer";

export const getPassengerName = (
  createOrderPayloadPassenger: CreateOrderPayloadPassenger,
  offerPassenger: OfferPassenger | undefined,
  fallbackIndex: number
): string => {
  if (
    createOrderPayloadPassenger.given_name &&
    createOrderPayloadPassenger.family_name
  ) {
    return `${createOrderPayloadPassenger.given_name} ${createOrderPayloadPassenger.family_name}`;
  }

  if (createOrderPayloadPassenger.given_name) {
    return createOrderPayloadPassenger.given_name;
  }

  if (createOrderPayloadPassenger.family_name) {
    return createOrderPayloadPassenger.family_name;
  }

  if (offerPassenger?.given_name && offerPassenger?.family_name) {
    return `${offerPassenger.given_name} ${offerPassenger.family_name}`;
  }

  if (offerPassenger?.given_name) {
    return offerPassenger.given_name;
  }

  if (offerPassenger?.family_name) {
    return offerPassenger.family_name;
  }

  return `Passenger ${fallbackIndex}`;
};
