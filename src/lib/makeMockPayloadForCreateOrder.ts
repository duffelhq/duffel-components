import { DuffelAPI } from "../types/DuffelAPI";

export const makeMockPayloadForCreateOrder = (
  id: string
): DuffelAPI.CreateOrderPayload => ({
  selected_offers: [id],
});
