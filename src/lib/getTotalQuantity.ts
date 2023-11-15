import { CreateOrder } from "@duffel/api/types";

export const getTotalQuantity = (
  fromSelectedServices: CreateOrder["services"]
) =>
  (fromSelectedServices || []).reduce(
    (total, { quantity }) => total + quantity,
    0
  );
