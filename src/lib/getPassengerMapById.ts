import {
  CreateOrderPayloadPassenger,
  CreateOrderPayloadPassengers,
} from "../types/CreateOrderPayload";

export type PassengerMapById = Record<
  CreateOrderPayloadPassenger["id"],
  CreateOrderPayloadPassenger
>;

export const getPassengerMapById = (
  passengers: CreateOrderPayloadPassengers
): PassengerMapById =>
  passengers.reduce(
    (all, passenger) => ({ [passenger.id]: passenger, ...all }),
    {} as PassengerMapById
  );
