import { createRoot, Root } from "react-dom/client";
import {
  DuffelAncillariesPropsWithClientKeyAndOfferId,
  DuffelAncillariesPropsWithOfferIdForFixture,
  DuffelAncillariesPropsWithOffersAndSeatMaps,
  DuffelAncillariesPropWithOfferAndClientKey,
  OnPayloadReady,
  OnPayloadReadyMetadata,
} from "../../types/DuffelAncillariesProps";
import { DuffelAncillaries } from "./DuffelAncillaries";
import { CreateOrder } from "@duffel/api/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "duffel-ancillaries": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const CUSTOM_ELEMENT_TAG = "duffel-ancillaries";

// A bit reptitive but typescript is not clever enough
// to infer the correct type if we just use
// `Omit<DuffelAncillariesProps, 'onPayloadReady'>`
type DuffelAncillariesCustomElementRenderArguments =
  | Omit<DuffelAncillariesPropsWithOfferIdForFixture, "onPayloadReady">
  | Omit<DuffelAncillariesPropsWithClientKeyAndOfferId, "onPayloadReady">
  | Omit<DuffelAncillariesPropWithOfferAndClientKey, "onPayloadReady">
  | Omit<DuffelAncillariesPropsWithOffersAndSeatMaps, "onPayloadReady">;

class DuffelAncillariesCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  private root!: Root;

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    const container = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(container);

    this.root = createRoot(container);
  }

  /**
   * When this function is called, it will render/re-render
   * the `DuffelAncillaries` component with the given props.
   */
  public render(withProps: DuffelAncillariesCustomElementRenderArguments) {
    if (!this.root) {
      throw "It was not possible to render `duffel-ancillaries` because `this.root` is missing.";
    }

    this.root.render(
      <DuffelAncillaries
        {...withProps}
        onPayloadReady={(data, metadata) => {
          this.dispatchEvent(
            new CustomEvent("onPayloadReady", {
              detail: { data, metadata },
              composed: true,
            }),
          );
        }}
      />,
    );
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(
    CUSTOM_ELEMENT_TAG,
    DuffelAncillariesCustomElement,
  );

function tryToGetDuffelAncillariesCustomElement(
  caller: string,
): DuffelAncillariesCustomElement {
  const element =
    document.querySelector<DuffelAncillariesCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find duffel-ancillaries element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`,
    );
  }
  return element;
}

export function renderDuffelAncillariesCustomElement(
  props: DuffelAncillariesCustomElementRenderArguments,
) {
  const element = tryToGetDuffelAncillariesCustomElement(
    "renderDuffelAncillariesCustomElement",
  );
  element.render(props);
}

type OnPayloadReadyCustomEvent = CustomEvent<{
  data: CreateOrder;
  metadata: OnPayloadReadyMetadata;
}>;

export function onDuffelAncillariesPayloadReady(
  onPayloadReady: OnPayloadReady,
) {
  const element = tryToGetDuffelAncillariesCustomElement(
    "onDuffelAncillariesPayloadReady",
  );
  const eventListener = (event: OnPayloadReadyCustomEvent) => {
    onPayloadReady(event.detail.data, event.detail.metadata);
  };

  // using `as EventListener` here because typescript doesn't know the event type for `onPayloadReady`
  // There's a few different suggestions to resolve this seemed good enough
  // You can learn more here: https://github.com/microsoft/TypeScript/issues/28357
  element.addEventListener("onPayloadReady", eventListener as EventListener);
}
