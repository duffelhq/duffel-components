import { makeMockOfferPassenger } from "@lib/mocks/make-mock-offer-passenger";
import * as React from "react";
import { makeMockOffer } from "@lib/mocks/make-mock-offer";
import {
  CreateOrderPayload,
  CreateOrderPayloadServices,
} from "src/types/CreateOrderPayload";
import { Offer } from "src//types/Offer";
import {
  BaggageSelection,
  BaggageSelectionProps,
  SetBaggageSelectionStateFunction,
} from "./BaggageSelection";
import { ErrorBoundary } from "./ErrorBoundary";

const MOCK_PASSENGERS = [makeMockOfferPassenger()];
const MOCK_OFFER = makeMockOffer();

const isPayloadComplete = (
  payload: Partial<CreateOrderPayload>
): payload is CreateOrderPayload =>
  "services" in payload &&
  "selected_offers" in payload &&
  "passengers" in payload;

interface CompileCreateOrderPayloadInput {
  offer: DuffelCheckoutProps["offer"];
  passengers: DuffelCheckoutProps["passengers"];
  baggageSelectedServices: BaggageSelectionProps["selectedServices"];
}

const compileCreateOrderPayload = ({
  baggageSelectedServices,
  offer,
  passengers,
}: CompileCreateOrderPayloadInput): Partial<CreateOrderPayload> => ({
  passengers,
  selected_offers: [offer.id],
  // have more services, add them below:
  services: [
    ...addBaggageServicesToCreateOrderPayload(baggageSelectedServices),
  ],
});

const addBaggageServicesToCreateOrderPayload = (
  baggageSelectedServices: CreateOrderPayloadServices
): CreateOrderPayloadServices => {
  if (!Array.isArray(baggageSelectedServices)) return [];
  return baggageSelectedServices.filter(({ quantity }) => quantity > 0);
};

export interface DuffelCheckoutProps {
  passengers: CreateOrderPayload["passengers"];
  offer: Offer;
  onPayloadReady: (data: CreateOrderPayload) => void;
}

export const DuffelCheckoutWithoutErrorBoundary: React.FC<DuffelCheckoutProps> =
  ({ offer, passengers, onPayloadReady }) => {
    // mock offer
    const shouldUseMockOffer = location.hash.includes("use-mock-offer=true");
    if (shouldUseMockOffer) {
      offer = MOCK_OFFER;
    }

    // mock passengers
    const shouldUseMockPassengers = location.hash.includes(
      "use-mock-passengers=true"
    );
    if (shouldUseMockPassengers) {
      passengers = MOCK_PASSENGERS;
    }

    // TODO we could load this state from somewhere in the future too
    const [baggageSelectedServices, setBaggageSelectionState] = React.useState<
      BaggageSelectionProps["selectedServices"]
    >([]);

    const handleOnBaggageSetSelectedServices: SetBaggageSelectionStateFunction =
      (baggageSelectionState) => {
        setBaggageSelectionState(baggageSelectionState);
      };

    const createOrderPayload = compileCreateOrderPayload({
      baggageSelectedServices,
      offer,
      passengers,
    });

    React.useEffect(() => {
      if (isPayloadComplete(createOrderPayload)) {
        onPayloadReady(createOrderPayload);
      }
    }, [createOrderPayload]);

    return (
      <div className="duffel-components">
        <link rel="stylesheet" href="../lib/styles/global.css"></link>
        <BaggageSelection
          offer={offer}
          passengers={passengers}
          selectedServices={baggageSelectedServices}
          setSelectedServices={handleOnBaggageSetSelectedServices}
        />
      </div>
    );
  };

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = (props) => (
  <ErrorBoundary>
    <DuffelCheckoutWithoutErrorBoundary {...props} />
  </ErrorBoundary>
);
