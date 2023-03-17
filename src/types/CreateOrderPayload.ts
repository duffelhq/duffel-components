import { Offer } from "./Offer";

// TODO: define types.
export interface CreateOrderPayload {
  selected_offers: Array<Offer["id"]>;
  passengers: [CreateOrderPayloadPassengers];
  services: CreateOrderPayloadServices;
}

export interface CreateOrderPayloadServices {
  id: string;
  quantity: number;
}

export interface CreateOrderPayloadPassengers {
  id: string;
}
