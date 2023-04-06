import { Offer } from "../../types/Offer";
import { makeMockAirline } from "./make-mock-airline";
import { makeMockOfferAvailableBaggageService } from "./make-mock-offer-available-baggage-service";
import { makeMockOfferPassenger } from "./make-mock-offer-passenger";
import { makeMockOfferSliceFromOriginDestination } from "./make-mock-offer-slice";

const getDefaultObject = (() => {
  let seedId = 1;
  return (): Offer => {
    const mockPassenger = makeMockOfferPassenger();
    const firstSlice = makeMockOfferSliceFromOriginDestination(
      "LHR",
      "JFK",
      mockPassenger.id
    );
    return {
      conditions: {
        // to create a mock in the future
        change_before_departure: null,
      },
      updated_at: "DATE",
      id: `off_${(seedId++).toString().padStart(5, "0")}`,
      allowed_passenger_identity_document_types: ["passport"],
      payment_requirements: {
        payment_required_by: "2022-01-17T10:42:14.545Z",
        price_guarantee_expires_at: "2022-01-17T10:42:14.545Z",
        requires_instant_payment: false,
      },
      available_services: [
        makeMockOfferAvailableBaggageService({
          segment_ids: [firstSlice.segments[0].id],
        }),
      ],
      base_amount: "500.00",
      base_currency: "GBP",
      created_at: "DATE",
      expires_at: "DATE",
      live_mode: true,
      owner: makeMockAirline(),
      passenger_identity_documents_required: true,
      passengers: [mockPassenger],
      slices: [
        firstSlice,
        makeMockOfferSliceFromOriginDestination("JFK", "LHR", mockPassenger.id),
      ],
      tax_amount: "100.00",
      tax_currency: "GBP",
      total_amount: "500.00",
      total_emissions_kg: "670",
      total_currency: "GBP",
    } as any;
  };
})();

export const makeMockOffer = (extendDefault?: Partial<Offer>): Offer =>
  Object.assign({}, getDefaultObject(), extendDefault || {});
