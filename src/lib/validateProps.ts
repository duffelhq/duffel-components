import {
  DuffelAncillariesProps,
  DuffelAncillariesPropsWithClientKeyAndOfferId,
  DuffelAncillariesPropsWithOfferIdForFixture,
  DuffelAncillariesPropsWithOffersAndSeatMaps,
  DuffelAncillariesPropWithOfferAndClientKey,
} from "src/types/DuffelAncillariesProps";

export const areDuffelAncillariesPropsValid = (props: DuffelAncillariesProps) =>
  hasCommonRequiredProps(props) &&
  (isDuffelAncillariesPropsWithClientKeyAndOfferId(props) ||
    isDuffelAncillariesPropsWithOfferAndSeatMaps(props) ||
    isDuffelAncillariesPropsWithOfferAndClientKey(props));

export const hasCommonRequiredProps = (props: DuffelAncillariesProps) =>
  "onPayloadReady" in props && "passengers" in props;

export const isDuffelAncillariesPropsWithOfferIdForFixture = (
  props: DuffelAncillariesProps
): props is DuffelAncillariesPropsWithOfferIdForFixture =>
  "offer_id" in props && props.offer_id.startsWith("fixture_");

export const isDuffelAncillariesPropsWithClientKeyAndOfferId = (
  props: DuffelAncillariesProps
): props is DuffelAncillariesPropsWithClientKeyAndOfferId =>
  "offer_id" in props && "client_key" in props;

export const isDuffelAncillariesPropsWithOfferAndSeatMaps = (
  props: DuffelAncillariesProps
): props is DuffelAncillariesPropsWithOffersAndSeatMaps =>
  "offer" in props && "seatMaps" in props;

export const isDuffelAncillariesPropsWithOfferAndClientKey = (
  props: DuffelAncillariesProps
): props is DuffelAncillariesPropWithOfferAndClientKey =>
  "offer" in props && "client_key" in props;