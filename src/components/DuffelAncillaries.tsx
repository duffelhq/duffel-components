import { compileCreateOrderPayload } from "@lib/compileCreateOrderPayload";
import { isPayloadComplete } from "@lib/isPayloadComplete";
import { retrieveOffer } from "@lib/retrieveOffer";
import { retrieveSeatMaps } from "@lib/retrieveSeatMaps";
import {
  areDuffelAncillariesPropsValid,
  isDuffelAncillariesPropsWithClientKeyAndOfferId,
  isDuffelAncillariesPropsWithOfferAndClientKey,
  isDuffelAncillariesPropsWithOfferAndSeatMaps,
} from "@lib/validateProps";
import * as React from "react";
import { Offer } from "src//types/Offer";
import { CreateOrderPayloadPassengers } from "src/types/CreateOrderPayload";
import {
  Ancillaries,
  DuffelAncillariesProps,
} from "src/types/DuffelAncillariesProps";
import { SeatMap } from "src/types/SeatMap";
import { ErrorBoundary } from "./ErrorBoundary";
import { FetchOfferErrorState } from "./FetchOfferErrorState";
import { Inspect } from "./Inspect";
import {
  BaggageSelectionCard,
  BaggageSelectionCardProps,
} from "./bags/BaggageSelectionCard";
import { SeatSelectionCard } from "./seats/SeatSelectionCard";

// We can turn this into a prop if we want to allow the user to select which ancillaries to show in the future
const ancillariesToShow = new Set<Ancillaries>(["bags", "seats"]);

const COMPONENT_CDN = process.env.COMPONENT_CDN || "";
const hrefToComponentStyles =
  COMPONENT_CDN +
  `${COMPONENT_CDN.startsWith("http://localhost") ? "/styles" : ""}/global.css`;

export const DuffelAncillaries: React.FC<DuffelAncillariesProps> = (props) => {
  if (!areDuffelAncillariesPropsValid(props)) {
    throw new Error(
      "The props passed to DuffelAncillaries are invalid. " +
        "`onPayloadReady` and `passengers` are always required. " +
        "Then, depending on your use case you may have one of the following combinations of required props: " +
        "`offer_id` and `client_key`, `offer` and `seatMaps` or `offer` and `client_key`." +
        "Please refer to the documentation for more information and working examples: " +
        "https://duffel.com/docs/_preview/ancillaries-component"
    );
  }

  const isDuffelAncillariesPropsWithOfferIdForFixture =
    isDuffelAncillariesPropsWithClientKeyAndOfferId(props);

  const isPropsWithClientKeyAndOfferId =
    isDuffelAncillariesPropsWithClientKeyAndOfferId(props);

  const isPropsWithOfferAndSeatMaps =
    isDuffelAncillariesPropsWithOfferAndSeatMaps(props);

  const isPropsWithOfferAndClientKey =
    isDuffelAncillariesPropsWithOfferAndClientKey(props);

  const [passengers, setPassengers] =
    React.useState<CreateOrderPayloadPassengers>(props.passengers);

  const [offer, setOffer] = React.useState<Offer | undefined>(
    isPropsWithOfferAndSeatMaps && isPropsWithOfferAndClientKey
      ? props.offer
      : undefined
  );

  const [isOfferLoading, setIsOfferLoading] = React.useState(
    isPropsWithClientKeyAndOfferId
  );

  const [seatMaps, setSeatMaps] = React.useState<SeatMap[] | undefined>(
    isPropsWithOfferAndSeatMaps ? props.seatMaps : undefined
  );
  const [isSeatMapLoading, setIsSeatMapLoading] = React.useState(
    !isPropsWithOfferAndSeatMaps
  );

  const [error, setError] = React.useState<null | string>(null);

  const [baggageSelectedServices, setBaggageSelectedServices] = React.useState<
    BaggageSelectionCardProps["selectedServices"]
  >([]);
  const [seatSelectedServices, setSeatSelectedServices] = React.useState<
    BaggageSelectionCardProps["selectedServices"]
  >([]);

  React.useEffect(() => {
    if (
      isPropsWithClientKeyAndOfferId ||
      isDuffelAncillariesPropsWithOfferIdForFixture
      // Do we also want to check wether the offer is undefined?
    ) {
      retrieveOffer(
        props.offer_id,
        props.client_key,
        setError,
        setIsOfferLoading,
        (offer) => {
          setOffer(offer);

          if (offer.passengers.length !== passengers.length) {
            throw new Error(
              `The number of passengers given to \`duffel-ancillaries\` (${props.passengers.length}) doesn't match ` +
                `the number of passengers on the given offer (${offer.passengers.length}).`
            );
          }

          if (isDuffelAncillariesPropsWithOfferIdForFixture) {
            // There's no way the component users will know the passenger IDs for the fixture offer
            // so we'll need to add them here
            setPassengers(
              props.passengers.map((passenger, index) => ({
                ...passenger,
                id: offer.passengers[index].id,
              }))
            );
          }
        }
      );
    }

    if (
      isDuffelAncillariesPropsWithOfferIdForFixture ||
      isPropsWithClientKeyAndOfferId ||
      isPropsWithOfferAndClientKey
      // Do we also want to check wether the seat maps is undefined?
    ) {
      retrieveSeatMaps(
        isPropsWithClientKeyAndOfferId ? props.offer_id : props.offer.id,
        props.client_key,
        setError,
        setIsSeatMapLoading,
        setSeatMaps
      );
    }
  }, [
    // `as any` is needed here because the list
    // of dependencies is different for each combination of props.
    // To satisfy typescript, we'd need to conditionally assign
    // the dependencies to the hook after checking its type,
    // however that is not possible in a react hook.
    (props as any).offer_id,
    (props as any).client_key,
    (props as any).offer?.id,
    (props as any).seatMaps?.[0]?.id,
  ]);

  React.useEffect(() => {
    if (!offer) return;

    const createOrderPayload = compileCreateOrderPayload({
      baggageSelectedServices,
      seatSelectedServices,
      offer,
      passengers,
      seatMaps,
    });

    if (isPayloadComplete(createOrderPayload)) {
      props.onPayloadReady(createOrderPayload, {
        baggageServices: baggageSelectedServices,
        seatServices: seatSelectedServices,
      });
    }
  }, [baggageSelectedServices, seatSelectedServices]);

  if (!areDuffelAncillariesPropsValid(props)) {
    return null;
  }

  const nonIdealStateHeight = `${
    // 72 (card height) + 32 gap between cards
    72 * ancillariesToShow.size + 32 * (ancillariesToShow.size - 1)
  }px`;

  const duffelComponentsStyle = {
    ...(props.styles?.accentColor && {
      "--ACCENT": props.styles.accentColor,
    }),
    ...(props.styles?.fontFamily && {
      "--FONT-FAMILY": props.styles.fontFamily,
    }),
    ...(props.styles?.buttonCornerRadius && {
      "--BUTTON-RADIUS": props.styles.buttonCornerRadius,
    }),
    // `as any` is needed here is needed because we want to set css variables
    // that are not part of the css properties type
  } as any;

  return (
    <>
      <link rel="stylesheet" href={hrefToComponentStyles}></link>

      <div
        className="duffel-components ancillaries-cards-container"
        style={duffelComponentsStyle}
      >
        <ErrorBoundary>
          {location.hash.includes("inspect-duffel-ancillaries") && (
            <Inspect
              props={props}
              state={{
                isOfferLoading,
                isSeatMapLoading,
                baggageSelectedServices,
                seatSelectedServices,
                offer,
                seatMaps,
                error,
              }}
            />
          )}

          {error && <FetchOfferErrorState height={nonIdealStateHeight} />}

          {!error && ancillariesToShow.has("bags") && (
            <BaggageSelectionCard
              isLoading={isOfferLoading}
              offer={offer}
              passengers={passengers}
              selectedServices={baggageSelectedServices}
              setSelectedServices={setBaggageSelectedServices}
            />
          )}

          {!error && ancillariesToShow.has("seats") && (
            <SeatSelectionCard
              isLoading={isOfferLoading || isSeatMapLoading}
              seatMaps={seatMaps}
              offer={offer}
              passengers={passengers}
              selectedServices={seatSelectedServices}
              setSelectedServices={setSeatSelectedServices}
            />
          )}
        </ErrorBoundary>
      </div>
    </>
  );
};