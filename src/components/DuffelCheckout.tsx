import { compileCreateOrderPayload } from "@lib/compileCreateOrderPayload";
import { isPayloadComplete } from "@lib/isPayloadComplete";
import { retrieveOffer } from "@lib/retrieveOffer";
import * as React from "react";
import { Offer } from "src//types/Offer";
import { CreateOrderPayload } from "src/types/CreateOrderPayload";
import { BaggageSelection, BaggageSelectionProps } from "./BaggageSelection";
import { ErrorBoundary } from "./ErrorBoundary";
import { Inspect } from "./Inspect";
import { Loader } from "./Loader";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const version = require("../../package.json").version;

const COMPONENT_CDN = `https://storage.googleapis.com/duffel-assets/ancillaries-component/${version}`;
const hrefToComponentStyles = `${COMPONENT_CDN}/global.css`;

interface DuffelCheckoutStyles {
  accentColor: string;
  buttonCornerRadius: string;
  fontFamily: string;
}

export interface DuffelCheckoutProps {
  offer_id: Offer["id"];
  client_key: Offer["client_key"];
  passengers: CreateOrderPayload["passengers"];
  onPayloadReady: (data: CreateOrderPayload) => void;
  styles?: DuffelCheckoutStyles;
}

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = ({
  offer_id,
  client_key,
  passengers,
  onPayloadReady,
  styles,
}) => {
  const [offer, setOffer] = React.useState<Offer>();
  const [error, setError] = React.useState<null | string>(null);
  const isLoading = !offer && !error;

  const [baggageSelectedServices, setBaggageSelectionState] = React.useState<
    BaggageSelectionProps["selectedServices"]
  >([]);

  React.useEffect(() => {
    if (!offer_id || !client_key) return;
    retrieveOffer(offer_id, client_key, setOffer, setError);
  }, [offer_id, client_key]);

  React.useEffect(() => {
    const createOrderPayload = compileCreateOrderPayload({
      baggageSelectedServices,
      offer,
      passengers,
    });
    if (isPayloadComplete(createOrderPayload)) {
      onPayloadReady(createOrderPayload);
    }
  }, [baggageSelectedServices]);

  return (
    <ErrorBoundary>
      <link rel="stylesheet" href={hrefToComponentStyles}></link>

      <div
        className="duffel-components"
        style={
          {
            ...(styles?.accentColor && {
              "--ACCENT": styles.accentColor,
            }),
            ...(styles?.fontFamily && { "--FONT-FAMILY": styles.fontFamily }),
            ...(styles?.buttonCornerRadius && {
              "--BUTTON-RADIUS": styles.buttonCornerRadius,
            }),
            // `as any` is needed here is needed because we want to set css variables
            // that are not part of the css properties type
          } as any
        }
      >
        {location.hash.includes("inspect-duffel-checkout") && (
          <Inspect
            data={{
              offer_id,
              client_key,
              passengers,
              baggageSelectedServices,
              offer,
              error,
            }}
          />
        )}

        {isLoading && <Loader />}

        {offer && passengers && (
          <BaggageSelection
            offer={offer}
            passengers={passengers}
            selectedServices={baggageSelectedServices}
            setSelectedServices={setBaggageSelectionState}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};
