import { StaysRate } from "@duffel/api/types";

export const getRateLabel = (
  paymentMethod: StaysRate["available_payment_methods"][number],
  paymentType: StaysRate["payment_type"],
): string | undefined => {
  if (paymentMethod === "balance") return "Pay now with Duffel Balance";
  else {
    // paymentMethod === "card" and...
    if (paymentType === "pay_now") return "Pay now with card";
    if (paymentType === "guarantee") return "Card payment at accommodation";
    if (paymentType === "deposit") return "Pay deposit with card";
  }

  // fallback
  if (paymentMethod === "card") return "Pay with card";
};
