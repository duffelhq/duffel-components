import { compileCreateOrderPayload } from "@lib/compileCreateOrderPayload";
import { isFixtureOfferId } from "@lib/isFixtureOfferId";
import { isPayloadComplete } from "@lib/isPayloadComplete";
import { retrieveOffer } from "@lib/retrieveOffer";
import { retrieveSeatMaps } from "@lib/retrieveSeatMaps";
import * as React from "react";
import { Offer } from "src//types/Offer";
import {
  CreateOrderPayload,
  CreateOrderPayloadPassengers,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { SeatMap } from "src/types/SeatMap";
import { ErrorBoundary } from "./ErrorBoundary";
import { FetchOfferErrorState } from "./FetchOfferErrorState";
import { Inspect } from "./Inspect";
import {
  BaggageSelectionCard,
  BaggageSelectionCardProps,
} from "./bags/BaggageSelectionCard";
import { SeatSelectionCard } from "./seats/SeatSelectionCard";

const baggage = "baggage" as const;
const seats = "seats" as const;

// this can be a setting we expose to the user later, right now we only have one feature anyway.
type Features = typeof baggage | typeof seats;
const selectedFeatures = new Set<Features>([baggage, seats]);

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const COMPONENT_CDN = process.env.COMPONENT_CDN || "";
const hrefToComponentStyles =
  COMPONENT_CDN +
  `${COMPONENT_CDN.startsWith("http://localhost") ? "/styles" : ""}/global.css`;

interface DuffelCheckoutStyles {
  accentColor: string;
  buttonCornerRadius: string;
  fontFamily: string;
}

export interface OnPayloadReadyMetada {
  baggageServices: CreateOrderPayloadServices;
  seatServices: CreateOrderPayloadServices;
}

export interface DuffelCheckoutProps {
  offer_id: Offer["id"];
  client_key: Offer["client_key"];
  passengers: CreateOrderPayload["passengers"];
  onPayloadReady: (
    data: CreateOrderPayload,
    metadata: OnPayloadReadyMetada
  ) => void;
  styles?: DuffelCheckoutStyles;
}

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = ({
  offer_id,
  client_key,
  passengers: passengersProp,
  onPayloadReady,
  styles,
}) => {
  const [offer, setOffer] = React.useState<Offer>();
  const [isOfferLoading, setIsOfferLoading] = React.useState(true);
  const onOfferReady = (offer: Offer) => {
    setOffer(offer);

    if (offer.passengers.length !== passengersProp.length) {
      throw new Error(
        "The number of passengers in the offer does not match the number of passengers for the payload."
      );
    }

    if (isFixtureOfferId(offer_id)) {
      const passengers = passengersProp.map((passenger, index) => ({
        ...passenger,
        id: offer.passengers[index].id,
      }));
      setPassengers(passengers);
    }
  };

  const [seatMaps, setSeatMaps] = React.useState<SeatMap[]>();
  const [isSeatMapLoading, setIsSeatMapLoading] = React.useState(true);

  const [passengers, setPassengers] =
    React.useState<CreateOrderPayloadPassengers>(passengersProp);

  const [error, setError] = React.useState<null | string>(null);

  const [baggageSelectedServices, setBaggageSelectedServices] = React.useState<
    BaggageSelectionCardProps["selectedServices"]
  >([]);
  const [seatSelectedServices, setSeatSelectedServices] = React.useState<
    BaggageSelectionCardProps["selectedServices"]
  >([]);

  React.useEffect(() => {
    if (!offer_id || !client_key) return;

    retrieveOffer(
      offer_id,
      client_key,
      onOfferReady,
      setError,
      setIsOfferLoading
    );

    retrieveSeatMaps(
      offer_id,
      client_key,
      setSeatMaps,
      setError,
      setIsSeatMapLoading
    );
  }, [offer_id, client_key]);

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
      onPayloadReady(createOrderPayload, {
        baggageServices: baggageSelectedServices,
        seatServices: seatSelectedServices,
      });
    }
  }, [baggageSelectedServices, seatSelectedServices]);

  const nonIdealStateHeight = `${
    // 72 (card height) + 32 gap between cards
    72 * selectedFeatures.size + 32 * (selectedFeatures.size - 1)
  }px`;

  const duffelComponentsStyle = {
    ...(styles?.accentColor && {
      "--ACCENT": styles.accentColor,
    }),
    ...(styles?.fontFamily && { "--FONT-FAMILY": styles.fontFamily }),
    ...(styles?.buttonCornerRadius && {
      "--BUTTON-RADIUS": styles.buttonCornerRadius,
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
          {location.hash.includes("inspect-duffel-checkout") && (
            <Inspect
              data={{
                offer_id,
                client_key,
                passengers,
                baggageSelectedServices,
                offer,
                error,
                seatMaps,
              }}
            />
          )}

          {error && <FetchOfferErrorState height={nonIdealStateHeight} />}

          {!error && selectedFeatures.has("baggage") && (
            <BaggageSelectionCard
              isLoading={isOfferLoading}
              offer={offer}
              passengers={passengers}
              selectedServices={baggageSelectedServices}
              setSelectedServices={setBaggageSelectedServices}
            />
          )}

          {!error && selectedFeatures.has("seats") && (
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
