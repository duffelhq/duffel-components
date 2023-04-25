import { createRoot, Root } from "react-dom/client";
import { DuffelAncillaries } from "./DuffelAncillaries";
import { DuffelAncillariesProps } from "src/types/DuffelAncillariesProps";

const CUSTOM_ELEMENT_TAG = "duffel-ancillaries";

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
  public render(withProps: DuffelAncillariesProps) {
    if (!this.root) {
      throw "It was not possible to render `duffel-ancillaries` because `this.root` is missing.";
    }

    this.root?.render(
      <DuffelAncillaries
        {...withProps}
        onPayloadReady={(data, metadata) =>
          this.dispatchEvent(
            new CustomEvent("onPayloadReady", {
              detail: { data, metadata },
              composed: true,
            })
          )
        }
      />
    );
  }
}

export default DuffelAncillariesCustomElement;

window.customElements.get(CUSTOM_ELEMENT_TAG) ||
  window.customElements.define(
    CUSTOM_ELEMENT_TAG,
    DuffelAncillariesCustomElement
  );
