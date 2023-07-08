import { captureErrorInSentry } from "@lib/captureErrorInSentry";
import { OfferAvailableServiceBaggageMetadata } from "../types/Offer";

export const getBaggageServiceDescription = (
  metadata: OfferAvailableServiceBaggageMetadata
) => {
  if (!metadata) {
    captureErrorInSentry(
      new Error("getBaggageServiceDescription was not given any metadata")
    );
    return null;
  }

  if (
    !metadata.maximum_weight_kg &&
    !metadata.maximum_length_cm &&
    !metadata.maximum_height_cm &&
    !metadata.maximum_depth_cm
  ) {
    return null;
  }

  const hasAllDimensions =
    metadata.maximum_length_cm &&
    metadata.maximum_height_cm &&
    metadata.maximum_depth_cm;

  let dimensionsLabel = "";
  if (hasAllDimensions) {
    dimensionsLabel = ` / ${metadata.maximum_height_cm} x ${metadata.maximum_length_cm} x ${metadata.maximum_depth_cm} cm`;
  }

  let weightLabel = "";
  if (metadata.maximum_weight_kg) {
    weightLabel = `Up to ${metadata.maximum_weight_kg}kg`;
  }

  return `${weightLabel}${dimensionsLabel}`;
};
