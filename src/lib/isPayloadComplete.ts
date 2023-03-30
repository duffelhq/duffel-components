import { CreateOrderPayload } from "src/types/CreateOrderPayload";

export const isPayloadComplete = (
  payload: Partial<CreateOrderPayload>
): payload is CreateOrderPayload =>
  "selected_offers" in payload &&
  "passengers" in payload &&
  "services" in payload &&
  "payments" in payload &&
  "type" in payload &&
  "metadata" in payload;
