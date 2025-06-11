import { StaysRate } from "@duffel/api/types";

export const getRateLabel = (
  paymentMethod: StaysRate["available_payment_methods"][number],
  paymentType: StaysRate["payment_type"],
): string | undefined => {
  if (paymentMethod === "balance") {
    return "Pay now with Duffel Balance";
  }

  if (paymentMethod === "card" && paymentType === "pay_now") {
    return "Pay now with card";
  }

  if (paymentMethod === "card" && paymentType === "guarantee") {
    return "Card payment at accommodation";
  }

  if (paymentMethod === "card" && paymentType === "deposit") {
    return "Pay deposit with card";
  }

  // fallback
  return "Pay with card";
};
