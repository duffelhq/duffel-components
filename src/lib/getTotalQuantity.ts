import { CreateOrderPayloadServices } from "../types/CreateOrderPayload";

export const getTotalQuantity = (
  fromSelectedServices: CreateOrderPayloadServices
) => fromSelectedServices.reduce((total, { quantity }) => total + quantity, 0);
