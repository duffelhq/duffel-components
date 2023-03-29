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

// TODO: move to env variables
const COMPONENT_CDN = "http://localhost:8000/";

export interface DuffelCheckoutProps {
  offer_id: Offer["id"];
  client_key: Offer["client_key"];
  passengers: CreateOrderPayload["passengers"];
  onPayloadReady: (data: CreateOrderPayload) => void;
}

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = ({
  offer_id,
  client_key,
  passengers,
  onPayloadReady,
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
      <link rel="stylesheet" href={COMPONENT_CDN + "styles/global.css"}></link>
      <div className="duffel-components">
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
