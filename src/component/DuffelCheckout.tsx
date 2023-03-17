import * as React from "react";
import { makeMockPayloadForCreateOrder } from "../lib/makeMockPayloadForCreateOrder";
import { DuffelAPI } from "../types/DuffelAPI";
import { ErrorBoundary } from "./ErrorBoundary";
import { TestSentry } from "./TestSentry";

export interface DuffelCheckoutProps {
  offer: DuffelAPI.Offer;
  onPayloadReady: (data: DuffelAPI.CreateOrderPayload) => void;
}

export const DuffelCheckoutWithoutErrorBoundary: React.FC<DuffelCheckoutProps> =
  ({ offer, onPayloadReady }) => {
    const [mountTime] = React.useState(new Date());
    const mockOrder = makeMockPayloadForCreateOrder(offer.id);
    const serialisedOfferToRender = JSON.stringify(offer, null, 2);

    return (
      <div>
        <pre
          style={{
            padding: "12px",
            color: "white",
            backgroundColor: "#0A0A0A",
          }}
        >
          {serialisedOfferToRender}
        </pre>

        <button onClick={() => onPayloadReady(mockOrder)}>
          Call{" "}
          <b>
            <code>onPayloadReady</code>
          </b>
        </button>

        <p>
          Component mounted on:{" "}
          <b>
            {/* You can use error boundary anywhere */}
            <ErrorBoundary>
              {/* TODO: delete this before merging to main, just here for convenience to demonstarte the bahviour on this PR */}
              <TestSentry />
              <code>{mountTime.toISOString()}</code>
            </ErrorBoundary>
          </b>
        </p>
      </div>
    );
  };

export const DuffelCheckout: React.FC<DuffelCheckoutProps> = (props) => (
  <ErrorBoundary>
    <DuffelCheckoutWithoutErrorBoundary {...props} />
  </ErrorBoundary>
);
