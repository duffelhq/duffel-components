import { CreateOrder, CreateOrderPassenger } from "@duffel/api/types";

export type PassengerMapById = Record<
  CreateOrderPassenger["id"],
  CreateOrderPassenger
>;

export const getPassengerMapById = (
  passengers: CreateOrder["passengers"]
): PassengerMapById =>
  passengers.reduce(
    (all, passenger) => ({ [passenger.id]: passenger, ...all }),
    {} as PassengerMapById
  );
