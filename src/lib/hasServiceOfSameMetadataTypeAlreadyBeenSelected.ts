import {
  CreateOrderService,
  OfferAvailableServiceBaggage,
} from "@duffel/api/types";
import { WithServiceInformation } from "src/types";

export const hasServiceOfSameMetadataTypeAlreadyBeenSelected = (
  selectedServices: WithServiceInformation<CreateOrderService>[],
  segmentId: string,
  passengerId: string,
  availableService: OfferAvailableServiceBaggage,
) =>
  selectedServices.some((selectedService) => {
    const isOnDifferentSegment =
      selectedService.serviceInformation?.segmentId !== segmentId;
    const doesAvailableServiceApplyToSegment =
      availableService.segment_ids?.includes(segmentId);
    const hasSameBaggageType =
      selectedService.serviceInformation?.type ===
      availableService.metadata.type;

    if (selectedService.id === availableService.id) {
      // if the selected service is the one on the counter, don't disable it
      // the max quantity will be availableService.maximum_quantity
      return false;
    } else if (
      selectedService.serviceInformation?.type !== "carry_on" &&
      selectedService.serviceInformation?.type !== "checked"
    ) {
      return false;
    } else if (isOnDifferentSegment) {
      // if the selected service doesn't belong to the same segment, don't disable it
      // unless the service applies to both segments
      return hasSameBaggageType && doesAvailableServiceApplyToSegment;
    } else if (
      // if the selected service doesn't belong to the same passenger, don't disable it
      selectedService.serviceInformation?.passengerId !== passengerId
    ) {
      return false;
    } else {
      // if this service selection controller is for the same passenger and segment, disable it
      return (
        selectedService.serviceInformation?.type ===
        availableService.metadata.type
      );
    }
  });
