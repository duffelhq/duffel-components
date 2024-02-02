import {
  CreateOrderService,
  OfferAvailableServiceBaggage,
} from "@duffel/api/types";
import { WithBaggageServiceInformation } from "src/types";

export function hasBaggageServiceOfSameMetadataTypeAlreadyBeenSelected(
  selectedServices: WithBaggageServiceInformation<CreateOrderService>[],
  availableService: OfferAvailableServiceBaggage
) {
  const selectedServiceMap: Record<string, string[]> = {};
  for (const service of selectedServices) {
    for (const key of getMetadataServiceUniquenessKey(service)) {
      if (!(key in selectedServiceMap)) {
        selectedServiceMap[key] = [service.id];
      } else {
        selectedServiceMap[key].push(service.id);
      }
    }
  }

  const availableServiceKeys =
    getMetadataServiceUniquenessKeyFromAvailableService(availableService);

  return availableServiceKeys.some((availableServiceKey) => {
    if (
      selectedServiceMap[availableServiceKey]?.includes(availableService.id)
    ) {
      // if the selected service is the one on the counter, don't disable it
      // the max quantity will be availableService.maximum_quantity
      return false;
    } else {
      return availableServiceKey in selectedServiceMap;
    }
  });
}

/**
 * Creates a unique key for a selected service based on its type, segmentId and passengerId
 */
function getMetadataServiceUniquenessKey(
  service: WithBaggageServiceInformation<CreateOrderService>
) {
  const keys: string[] = [];
  for (const segmentId of service.serviceInformation.segmentIds) {
    for (const passengerId of service.serviceInformation.passengerIds) {
      keys.push(
        [service.serviceInformation.type, segmentId, passengerId].join(":")
      );
    }
  }

  return keys;
}

/**
 * Creates a unique key for an avaialable service based on its type, segmentId and passengerId
 */
function getMetadataServiceUniquenessKeyFromAvailableService(
  service: OfferAvailableServiceBaggage
) {
  const keys: string[] = [];
  for (const segmentId of service.segment_ids) {
    for (const passengerId of service.passenger_ids) {
      keys.push([service.metadata.type, segmentId, passengerId].join(":"));
    }
  }

  return keys;
}
