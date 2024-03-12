import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { DuffelCardForm } from "./DuffelCardForm";
import { DuffelCardFormProps } from "./lib/types";
import { getIframeURL } from "./lib/getIframeURL";
import { postMessageToSaveCard } from "./lib/postMessageToSaveCard";
import { postMessageToCreateCardForTemporaryUse } from "./lib/postMessageToCreateCardForTemporaryUse";

const CUSTOM_ELEMENT_TAG = "duffel-card-form";

type DuffelCardFormCustomElementRenderArguments = Pick<
  DuffelCardFormProps,
  "clientKey" | "intent" | "savedCardData" | "styles" | "tokenProxyEnvironment"
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [CUSTOM_ELEMENT_TAG]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface Window {
    renderDuffelCardFormCustomElement: typeof renderDuffelCardFormCustomElement;
    saveCard: typeof saveCard;
    createCardForTemporaryUse: typeof createCardForTemporaryUse;
    onValidateSuccess: typeof onValidateSuccess;
    onValidateFailure: typeof onValidateFailure;
    onSaveCardSuccess: typeof onSaveCardSuccess;
    onSaveCardFailure: typeof onSaveCardFailure;
    onCreateCardForTemporaryUseSuccess: typeof onCreateCardForTemporaryUseSuccess;
    onCreateCardForTemporaryUseFailure: typeof onCreateCardForTemporaryUseFailure;
  }
}

class DuffelCardFormCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  private root!: Root;

  /**
   * the shadow root where the component will be rendered
   */
  shadowRoot!: ShadowRoot;

  iFrameURL!: URL;

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    this.shadowRoot.appendChild(container);

    this.root = createRoot(container);
  }

  private getIframe() {
    const iframe = this.shadowRoot.querySelector("iframe");
    return iframe;
  }

  /**
   * When this function is called, it will render/re-render
   * the component with the given props.
   */
  public render(withProps: DuffelCardFormCustomElementRenderArguments) {
    if (!this.root) {
      throw `It was not possible to render ${CUSTOM_ELEMENT_TAG} because 'this.root' is missing.`;
    }

    this.iFrameURL = getIframeURL(
      withProps.tokenProxyEnvironment,
      withProps.intent,
      withProps.clientKey,
      withProps.savedCardData,
    );

    this.root.render(
      <DuffelCardForm
        {...withProps}
        onValidateSuccess={() =>
          this.dispatchEvent(
            new CustomEvent("onValidateSuccess", {
              composed: true,
            }),
          )
        }
        onValidateFailure={() =>
          this.dispatchEvent(
            new CustomEvent("onValidateFailure", {
              composed: true,
            }),
          )
        }
        onSaveCardSuccess={(data) =>
          this.dispatchEvent(
            new CustomEvent("onSaveCardSuccess", {
              detail: { data },
              composed: true,
            }),
          )
        }
        onSaveCardFailure={(error) =>
          this.dispatchEvent(
            new CustomEvent("onSaveCardFailure", {
              detail: { error },
              composed: true,
            }),
          )
        }
        onCreateCardForTemporaryUseSuccess={(data) =>
          this.dispatchEvent(
            new CustomEvent("onCreateCardForTemporaryUseSuccess", {
              detail: { data },
              composed: true,
            }),
          )
        }
        onCreateCardForTemporaryUseFailure={(error) =>
          this.dispatchEvent(
            new CustomEvent("onCreateCardForTemporaryUseFailure", {
              detail: { error },
              composed: true,
            }),
          )
        }
      />,
    );
  }

  public saveCard() {
    const iframe = this.getIframe();
    if (!iframe) throw new Error("Could not find iframe");

    postMessageToSaveCard({ current: iframe }, this.iFrameURL);
  }

  public createCardForTemporaryUse() {
    const iframe = this.getIframe();
    if (!iframe) throw new Error("Could not find iframe");

    postMessageToCreateCardForTemporaryUse({ current: iframe }, this.iFrameURL);
  }
}

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(CUSTOM_ELEMENT_TAG, DuffelCardFormCustomElement);

function tryToGetCustomElement(caller: string): DuffelCardFormCustomElement {
  const element =
    document.querySelector<DuffelCardFormCustomElement>(CUSTOM_ELEMENT_TAG);
  if (!element) {
    throw new Error(
      `Could not find ${CUSTOM_ELEMENT_TAG} element in the DOM. Maybe you need to call ${caller} after 'window.onload'?`,
    );
  }
  return element;
}

export function renderDuffelCardFormCustomElement(
  props: DuffelCardFormCustomElementRenderArguments,
) {
  const element = tryToGetCustomElement("renderDuffelCardFormCustomElement");
  element.render(props);
}

export function saveCard() {
  const element = tryToGetCustomElement("saveCard");
  element.saveCard();
}

export function createCardForTemporaryUse() {
  const element = tryToGetCustomElement("createCardForTemporaryUse");
  element.createCardForTemporaryUse();
}

type DuffelCardFormPropActions = Pick<
  DuffelCardFormProps,
  | "onValidateSuccess"
  | "onValidateFailure"
  | "onSaveCardSuccess"
  | "onSaveCardFailure"
  | "onCreateCardForTemporaryUseSuccess"
  | "onCreateCardForTemporaryUseFailure"
>;

function registerCallbackFactory<T extends keyof DuffelCardFormPropActions>(
  eventPropName: T,
  eventDetailArgumentName?: string,
) {
  return function (callback: NonNullable<DuffelCardFormPropActions[T]>) {
    const element = tryToGetCustomElement(
      `registerCallbackFactory(${eventPropName})`,
    );

    element.addEventListener(eventPropName, (event) => {
      const eventDetail = (event as CustomEvent).detail;
      if (eventDetailArgumentName) {
        callback(eventDetail[eventDetailArgumentName]);
      } else {
        // Using as never here to reinforce to typescript that
        // no value will be passed to the callback
        callback(undefined as never);
      }
    });
  };
}

export const onValidateSuccess = registerCallbackFactory("onValidateSuccess");

export const onValidateFailure = registerCallbackFactory("onValidateFailure");

export const onSaveCardSuccess = registerCallbackFactory(
  "onSaveCardSuccess",
  "data",
);

export const onSaveCardFailure = registerCallbackFactory(
  "onSaveCardFailure",
  "error",
);

export const onCreateCardForTemporaryUseSuccess = registerCallbackFactory(
  "onCreateCardForTemporaryUseSuccess",
  "data",
);

export const onCreateCardForTemporaryUseFailure = registerCallbackFactory(
  "onCreateCardForTemporaryUseFailure",
  "error",
);

window.renderDuffelCardFormCustomElement = renderDuffelCardFormCustomElement;
window.saveCard = saveCard;
window.createCardForTemporaryUse = createCardForTemporaryUse;
window.onValidateSuccess = onValidateSuccess;
window.onValidateFailure = onValidateFailure;
window.onSaveCardSuccess = onSaveCardSuccess;
window.onSaveCardFailure = onSaveCardFailure;
window.onCreateCardForTemporaryUseSuccess = onCreateCardForTemporaryUseSuccess;
window.onCreateCardForTemporaryUseFailure = onCreateCardForTemporaryUseFailure;
