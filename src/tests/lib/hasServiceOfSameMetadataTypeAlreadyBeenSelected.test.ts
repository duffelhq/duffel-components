import { OfferAvailableServiceBaggage, OrderService } from "@duffel/api/types";
import { hasServiceOfSameMetadataTypeAlreadyBeenSelected } from "../../lib/hasServiceOfSameMetadataTypeAlreadyBeenSelected";
import { WithServiceInformation } from "src/types";

const availableService: OfferAvailableServiceBaggage = {
  id: "available_service_id",
  metadata: { type: "checked" },
  // using as any because we don't need to test the whole type
} as any;

// TODO(idp): remove this when we merge https://github.com/duffelhq/duffel-api-javascript/pull/843
type CreateOrderService = Pick<OrderService, "id" | "quantity">;

const selectedService: WithServiceInformation<CreateOrderService> = {
  id: "selected_service_id",
  quantity: 1,
  serviceInformation: {
    type: "checked",
    total_amount: "10.00",
    total_currency: "GBP",
    segmentId: "segment_id",
    passengerId: "passenger_id",
    passengerName: "Traveller Smith",
    maximum_weight_kg: null,
    maximum_height_cm: null,
    maximum_length_cm: null,
    maximum_depth_cm: null,
  },
};

describe("hasServiceOfSameMetadataTypeAlreadyBeenSelected", () => {
  it("Should return false if no services selected", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [],
        "segment_id",
        "passenger_id",
        availableService
      )
    ).toBe(false);
  });

  it("Should return false if service selected is the availableService we are checking", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [{ ...selectedService, id: availableService.id }],
        "segment_id",
        "passenger_id",
        availableService
      )
    ).toBe(false);
  });

  it("Should return false if service selected are for different passenger", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        "segment_id",
        "passenger_id_wont_match",
        availableService
      )
    ).toBe(false);
  });

  it("Should return false if service selected are for different segment", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        "segment_id_wont_match",
        "passenger_id",
        availableService
      )
    ).toBe(false);
  });

  it("Should return false if service selected is of different type", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        "segment_id",
        "passenger_id",
        { ...availableService, metadata: { type: "carry_on" } } as any
      )
    ).toBe(false);
  });

  it("Should return true if service selected is of same type for same passenger and segment", () => {
    expect(
      hasServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        "segment_id",
        "passenger_id",
        availableService
      )
    ).toBe(true);
  });
});
