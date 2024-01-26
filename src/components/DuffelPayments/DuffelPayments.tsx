import { ErrorBoundary } from "@components/shared/ErrorBoundary";
import { hasHighLuminance } from "@lib/hasHighLuminance";
import { initializeLogger } from "@lib/logging";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardElement, StripeError, loadStripe } from "@stripe/stripe-js";
import * as React from "react";
import { CustomStyles } from "../../types";
import { Button } from "../shared/Button";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

const STRIPE_CARD_ELEMENT = "card";
const COMPONENT_VERSION = process.env.COMPONENT_VERSION;

export interface DuffelPaymentsProps {
  paymentIntentClientToken: string;
  onSuccessfulPayment: () => void;
  onFailedPayment: (error: StripeError) => void;

  styles?: CustomStyles;
  debug?: boolean;
}

const CARD_ELEMENT_STYLE_BASE = {
  color: "var(--GREY-900)",
  fontFamily:
    '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"',
  fontSmoothing: "antialiased",
  fontSize: "16px",
  "::placeholder": {
    color: "#ababb4",
  },
};

const CARD_ELEMENT_STYLE_INVALID = {
  color: "#ef4444",
  iconColor: "#ef4444",
};

const CardPaymentComponent: React.FC<DuffelPaymentsProps> = ({
  styles,
  paymentIntentClientToken,
  onSuccessfulPayment,
  onFailedPayment,
}) => {
  const [cardElement, setCardElement] =
    React.useState<StripeCardElement | null>(null);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    if (elements && !cardElement) {
      const maybeCard = elements?.getElement(STRIPE_CARD_ELEMENT);
      maybeCard && setCardElement(maybeCard as StripeCardElement);
    }
  }, [elements, cardElement]);

  React.useEffect(() => {
    if (cardElement) {
      cardElement.on("change", (event) => {
        const { error, complete } = event;

        if (error) {
          setIsInvalid(true);
          setErrorMessage(error.message);
        } else {
          setIsInvalid(false);
        }
        complete ? setIsComplete(true) : setIsComplete(false);
      });
    }
  }, [cardElement]);

  // User is responsible for handling outcome of payment.
  const handleSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    if (cardElement) {
      setIsProcessing(true);
      const decodedDuffelPaymentIntentClientToken = atob(
        paymentIntentClientToken,
      );
      const parsedDuffelPaymentIntentClientToken = JSON.parse(
        decodedDuffelPaymentIntentClientToken,
      );
      const { client_secret: clientSecret } =
        parsedDuffelPaymentIntentClientToken;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          metadata: {
            duffel_components_version:
              COMPONENT_VERSION || "failed-to-get-version",
          },
        },
      });

      setIsProcessing(false);
      if (result.error) {
        const { error } = result;
        onFailedPayment(error);
      } else {
        onSuccessfulPayment();
      }
    }
  };

  return paymentIntentClientToken ? (
    <div className="card-payment__container">
      <form onSubmit={handleSubmit}>
        {isProcessing && (
          <div
            className="card-payment--in-progress"
            aria-live="polite"
            aria-busy="true"
          />
        )}
        <CardElement
          className="card-details"
          options={{
            style: {
              base: {
                ...CARD_ELEMENT_STYLE_BASE,
                ...(styles?.fontFamily && {
                  fontFamily: styles.fontFamily,
                }),
              },
              invalid: { ...CARD_ELEMENT_STYLE_INVALID },
            },
          }}
        />
        <div className="card-payment__container--invalid" role="alert">
          {isInvalid && errorMessage}
        </div>
        <Button
          className="card-payment__pay-button"
          type="submit"
          disabled={!isComplete || isProcessing}
          aria-label="Pay"
        >
          {isProcessing ? "Processing..." : "Pay"}
        </Button>
      </form>
    </div>
  ) : null;
};

export const DuffelPayments: React.FC<DuffelPaymentsProps> = (props) => {
  const [stripe, setStripe] = React.useState<Promise<any> | null>(null);
  initializeLogger(props.debug || false);

  const decodedDuffelPaymentIntentClientToken = atob(
    props.paymentIntentClientToken,
  );

  let parsedDuffelPaymentIntentClientToken;

  try {
    parsedDuffelPaymentIntentClientToken = JSON.parse(
      decodedDuffelPaymentIntentClientToken,
    );
  } catch (error) {
    throw new Error("Invalid Duffel payment intent client token provided");
  }

  const { publishable_key: duffelPublishableKey } =
    parsedDuffelPaymentIntentClientToken;

  React.useEffect(() => {
    if (!stripe && duffelPublishableKey) {
      const stripe = loadStripe(duffelPublishableKey);
      stripe && setStripe(stripe);
    }
  }, [stripe, duffelPublishableKey]);

  const duffelComponentsStyle: React.CSSProperties = {
    ...(props.styles?.accentColor && {
      "--ACCENT": props.styles.accentColor,
    }),
    ...(props.styles?.accentColor &&
      hasHighLuminance(props.styles.accentColor) && {
        "--SECONDARY": "black",
        "--TERTIARY": "grey",
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
    <WithComponentStyles>
      <div style={duffelComponentsStyle}>
        <ErrorBoundary>
          <Elements stripe={stripe}>
            <CardPaymentComponent {...props} />
          </Elements>
        </ErrorBoundary>
      </div>
    </WithComponentStyles>
  );
};
