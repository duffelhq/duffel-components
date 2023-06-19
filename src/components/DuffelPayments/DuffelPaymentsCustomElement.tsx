import { StripeError } from "@stripe/stripe-js";
import { createRoot, Root } from "react-dom/client";
import { DuffelPayments, DuffelPaymentsProps } from "./DuffelPayments";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "duffel-payments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const CUSTOM_ELEMENT_TAG = "duffel-payments";

type DuffelPaymentsCustomElementRenderArguments = Pick<
  DuffelPaymentsProps,
  "paymentIntentClientToken" | "styles"
>;

class DuffelPaymentsCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  private root!: Root;

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    const container = document.createElement("div");
    this.appendChild(container);

    this.root = createRoot(container);
  }

  /**
   * When this function is called, it will render/re-render
   * the `DuffelPayments` component with the given props.
   */
  public render(withProps: DuffelPaymentsCustomElementRenderArguments) {
    if (!this.root) {
      throw "It was not possible to render `duffel-payments` because `this.root` is missing.";
    }

    this.root.render(
      <DuffelPayments
        {...withProps}
        onSuccessfulPayment={() => {
          this.dispatchEvent(
            new CustomEvent("onSuccessfulPayment", {
              composed: true,
            })
          );
        }}
        onFailedPayment={(error: StripeError) => {
          this.dispatchEvent(
            new CustomEvent("onFailedPayment", {
              detail: { error },
              composed: true,
            })
          );
        }}
      />
    );
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(CUSTOM_ELEMENT_TAG, DuffelPaymentsCustomElement);

function tryToGetDuffelPaymentsCustomElement(
  caller: string
): DuffelPaymentsCustomElement {
  const element =
    document.querySelector<DuffelPaymentsCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find duffel-payments element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`
    );
  }
  return element;
}

export function renderDuffelPaymentsCustomElement(
  props: DuffelPaymentsCustomElementRenderArguments
) {
  const element = tryToGetDuffelPaymentsCustomElement(
    "renderDuffelPaymentsCustomElement"
  );
  element.render(props);
}

export function onDuffelPaymentsSuccessfulPayment(
  onSuccessfulPayment: DuffelPaymentsProps["onSuccessfulPayment"]
) {
  const element = tryToGetDuffelPaymentsCustomElement(
    "onDuffelPaymentsPayloadReady"
  );

  // using `as EventListener` here because typescript doesn't know the event type for `onPayloadReady`
  // There's a few different suggestions to resolve this seemed good enough
  // You can learn more here: https://github.com/microsoft/TypeScript/issues/28357
  element.addEventListener(
    "onPayloadReady",
    onSuccessfulPayment as EventListener
  );
}

type OnFailedPaymentCustomEvent = CustomEvent<{
  error: StripeError;
}>;
export function onDuffelPaymentsFailedPayment(
  onFailedPayment: DuffelPaymentsProps["onFailedPayment"]
) {
  const element = tryToGetDuffelPaymentsCustomElement(
    "onDuffelPaymentsPayloadReady"
  );
  const eventListener = (event: OnFailedPaymentCustomEvent) => {
    onFailedPayment(event.detail.error);
  };

  // using `as EventListener` here because typescript doesn't know the event type for `onPayloadReady`
  // There's a few different suggestions to resolve this seemed good enough
  // You can learn more here: https://github.com/microsoft/TypeScript/issues/28357
  element.addEventListener("onPayloadReady", eventListener as EventListener);
}
