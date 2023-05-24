import { hasServiceOfSameMetadataTypeAlreadyBeenSelected } from "@lib/hasServiceOfSameMetadataTypeAlreadyBeenSelected";
import { CreateOrderPayloadService } from "src/types/CreateOrderPayload";
import { OfferAvailableBaggageService } from "src/types/Offer";

const availableService: OfferAvailableBaggageService = {
  id: "available_service_id",
  metadata: { type: "checked" },
  // using as any because we don't need to test the whole type
} as any;

const selectedService: CreateOrderPayloadService = {
  id: "selected_service_id",
  serviceInformation: {
    segmentId: "segment_id",
    passengerId: "passenger_id",
    type: "checked",
  },
} as any;

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
