import {
  CreateOrderService,
  OfferAvailableServiceBaggage,
} from "@duffel/api/types";
import { WithBaggageServiceInformation } from "src/types";
import { hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected } from "../../lib/hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected";

const availableService: OfferAvailableServiceBaggage = {
  id: "available_service_id",
  type: "baggage",
  metadata: {
    type: "checked",
    maximum_weight_kg: null,
    maximum_height_cm: null,
    maximum_length_cm: null,
    maximum_depth_cm: null,
  },
  maximum_quantity: 1,
  passenger_ids: ["passenger_id"],
  segment_ids: ["segment_id"],
  total_amount: "10.00",
  total_currency: "GBP",
};

const selectedService: WithBaggageServiceInformation<CreateOrderService> = {
  id: "selected_service_id",
  quantity: 1,
  serviceInformation: {
    type: "checked",
    total_amount: "10.00",
    total_currency: "GBP",
    segmentIds: ["segment_id"],
    passengerIds: ["passenger_id"],
    passengerName: "Traveller Smith",
    maximum_weight_kg: null,
    maximum_height_cm: null,
    maximum_length_cm: null,
    maximum_depth_cm: null,
  },
};

describe("hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected", () => {
  it("Should return false if no services selected", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [],
        availableService
      )
    ).toBe(false);
  });

  it("Should return false if service selected is the availableService we are checking", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        { ...availableService, id: selectedService.id }
      )
    ).toBe(false);
  });

  it("Should return false if service selected is for different passenger", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        { ...availableService, passenger_ids: ["passenger_id_no_match"] }
      )
    ).toBe(false);
  });

  it("Should return false if service selected is for different segment", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [
          {
            ...selectedService,
            serviceInformation: {
              ...selectedService.serviceInformation,
              segmentIds: ["segment_id_no_match"],
            },
          },
        ],
        availableService
      )
    ).toBe(false);
  });

  it("Should return true if service selected includes avaiable service segment", () => {
    /*
      assuming types are the same and passenger is the same
        selected : [seg_1, seg_2]
        available: [seg_2] <-- should not be selected
  */

    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [
          {
            ...selectedService,
            serviceInformation: {
              ...selectedService.serviceInformation,
              segmentIds: ["segment_id_no_match", "segment_id"],
            },
          },
        ],
        availableService
      )
    ).toBe(true);
  });

  it("Should return false if service selected is of different type", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        { ...availableService, metadata: { type: "carry_on" } } as any
      )
    ).toBe(false);
  });

  it("Should return true if service selected is of same type for same passenger and segment", () => {
    expect(
      hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
        [selectedService],
        availableService
      )
    ).toBe(true);
  });
});
