import { captureErrorInSentry } from "@lib/captureErrorInSentry";
import { compileCreateOrderPayload } from "@lib/compileCreateOrderPayload";
import * as React from "react";
import { Offer } from "src//types/Offer";
import { CreateOrderPayload } from "src/types/CreateOrderPayload";
import { BaggageSelection, BaggageSelectionProps } from "./BaggageSelection";
import { ErrorBoundary } from "./ErrorBoundary";

// TODO: move to env variables
const COMPONENT_CDN = "http://localhost:8000/";
const DUFFEL_API_URL = "https://localhost:4000";

const isPayloadComplete = (
  payload: Partial<CreateOrderPayload>
): payload is CreateOrderPayload =>
  "selected_offers" in payload &&
  "passengers" in payload &&
  "services" in payload &&
  "payments" in payload &&
  "type" in payload &&
  "metadata" in payload;

export interface DuffelCheckoutProps {
  offer_id: Offer["id"];
  client_key: Offer["client_key"];
  passengers: CreateOrderPayload["passengers"];
  onPayloadReady: (data: CreateOrderPayload) => void;
}

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = ({
  offer_id,
  client_key,
  passengers: passengersProp,
  onPayloadReady,
}) => {
  const [offer, setOffer] = React.useState<Offer>();
  const [error, setError] = React.useState<null | string>(null);

  const [passengers, setPassengers] = React.useState(passengersProp);

  const [baggageSelectedServices, setBaggageSelectionState] = React.useState<
    BaggageSelectionProps["selectedServices"]
  >([]);

  React.useEffect(() => setPassengers(passengersProp), [passengersProp]);

  React.useEffect(() => {
    if (!offer_id || !client_key) return;

    // TODO replace with env variable
    fetch(
      `${DUFFEL_API_URL}/ancillaries-component/offers/${offer_id}?return_available_services=true`,
      {
        headers: {
          "Duffel-Version": "v1",
          Authorization: `Bearer ${client_key}`,
        },
      }
    )
      .then((res) => res.json())
      .then(({ data }) => setOffer(data))
      .catch((error) => {
        // TODO: improve error reporting here
        setError("Failed to get offer");
        captureErrorInSentry(error, { offer_id });
      });
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
        <pre
          style={{
            border: "solid 1px black",
            padding: "12px",
            overflowX: "scroll",
          }}
        >
          <>
            <b>{"Attributes:\n"}</b>
            {`${offer_id ? "✓" : "x"} offer_id: ${offer_id}\n`}
            {`${client_key ? "✓" : "x"} client_key: ${client_key}\n\n`}

            <b>{"Init data:\n"}</b>
            {`${passengers ? "✓" : "x"} passengers: ${JSON.stringify(
              passengers
            )}\n\n`}

            <b>{"Internal state:\n"}</b>
            {`${offer ? "✓" : "x"} offer: ${
              JSON.stringify(offer) || "Loading..."
            }\n`}
            {`${
              baggageSelectedServices ? "✓" : "x"
            } baggageSelectedServices: ${JSON.stringify(
              baggageSelectedServices
            )}\n\n`}
          </>
        </pre>

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
