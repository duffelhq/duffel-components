import * as React from "react";
import { CreateOrderPayload } from "../types/CreateOrderPayload";
import { Offer } from "../types/Offer";
import {
  BaggageSelection,
  BaggageSelectionProps,
  SetBaggageSelectionStateFunction,
} from "./ancillaries/baggage-selection";
import { ErrorBoundary } from "./ErrorBoundary";

const isPayloadComplete = (
  payload: Partial<CreateOrderPayload>
): payload is CreateOrderPayload =>
  "selected_services" in payload &&
  "selected_offers" in payload &&
  "passengers" in payload;

interface CompileCreateOrderPayloadInput {
  offer: DuffelCheckoutProps["offer"];
  passengers: DuffelCheckoutProps["passengers"];
  baggageSelectionState: BaggageSelectionProps["baggageSelectionState"];
}

const compileCreateOrderPayload = ({
  baggageSelectionState,
  offer,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => ({
  passengers,
  selected_offers: [offer.id],
  ...(baggageSelectionState?.selected_services && {
    selected_services: baggageSelectionState?.selected_services,
  }),
});

export interface DuffelCheckoutProps {
  passengers: CreateOrderPayload["passengers"];
  offer: Offer;
  onPayloadReady: (data: CreateOrderPayload) => void;
}

export const DuffelCheckoutWithoutErrorBoundary: React.FC<DuffelCheckoutProps> =
  ({ offer, passengers, onPayloadReady }) => {
    const [baggageSelectionState, setBaggageSelectionState] = React.useState<
      BaggageSelectionProps["baggageSelectionState"] | null
    >(null);

    const handleOnBaggageSelectionChange: SetBaggageSelectionStateFunction = (
      baggageSelectionState
    ) => {
      setBaggageSelectionState(baggageSelectionState);
    };

    const createOrderPayload = compileCreateOrderPayload({
      baggageSelectionState,
      offer,
      passengers,
    });

    React.useEffect(() => {
      if (isPayloadComplete(createOrderPayload)) {
        onPayloadReady(createOrderPayload);
      } else {
        console.log("partial payload");
        console.log(createOrderPayload);
      }
    }, [createOrderPayload]);

    return (
      <>
        <BaggageSelection
          offer={offer}
          baggageSelectionState={baggageSelectionState}
          setBaggageSelectionState={handleOnBaggageSelectionChange}
        />
      </>
    );
  };

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = (props) => (
  <ErrorBoundary>
    <DuffelCheckoutWithoutErrorBoundary {...props} />
  </ErrorBoundary>
);
