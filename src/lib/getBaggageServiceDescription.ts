import { OfferAvailableServiceBaggageMetadata } from "@duffel/api/types";
import { captureErrorInSentry } from "@lib/captureErrorInSentry";
import { DuffelAncillariesLocalisationStrings } from "../types";

export const getBaggageServiceDescription = (
  metadata: OfferAvailableServiceBaggageMetadata,
  localisationStrings?: DuffelAncillariesLocalisationStrings,
) => {
  if (!metadata) {
    captureErrorInSentry(
      new Error("getBaggageServiceDescription was not given any metadata"),
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

  const getBaggageMaximumDimensionsLabel =
    localisationStrings?.baggageMaximumDimensions
      ? localisationStrings.baggageMaximumDimensions
      : (
          heightInCentimeters: number,
          lengthInCentimeters: number,
          depthInCentimeters: number,
        ) =>
          `${heightInCentimeters} x ${lengthInCentimeters} x ${depthInCentimeters} cm`;

  const getBaggageMaximumWeightLabel = localisationStrings?.baggageMaximumWeight
    ? localisationStrings.baggageMaximumWeight
    : (weightInKilograms: number) => `${weightInKilograms} kg`;

  let dimensionsLabel = "";
  if (
    metadata.maximum_length_cm &&
    metadata.maximum_height_cm &&
    metadata.maximum_depth_cm
  ) {
    dimensionsLabel = ` / ${getBaggageMaximumDimensionsLabel(metadata.maximum_height_cm, metadata.maximum_length_cm, metadata.maximum_depth_cm)}`;
  }

  let weightLabel = "";
  if (metadata.maximum_weight_kg) {
    weightLabel = `Up to ${getBaggageMaximumWeightLabel(metadata.maximum_weight_kg)}`;
  }

  return `${weightLabel}${dimensionsLabel}`;
};
