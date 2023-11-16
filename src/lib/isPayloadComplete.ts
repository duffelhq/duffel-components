import { CreateOrder } from "@duffel/api/types";

export const isPayloadComplete = (
  payload: Partial<CreateOrder>
): payload is CreateOrder =>
  "selected_offers" in payload &&
  "passengers" in payload &&
  "services" in payload &&
  "payments" in payload &&
  "type" in payload &&
  "metadata" in payload;
