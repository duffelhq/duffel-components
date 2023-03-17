import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { DuffelAPI } from "../types/DuffelAPI";
import { DuffelCheckout } from "./DuffelCheckout";

class DuffelCheckoutCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  root!: Root;

  /**
   * The callback users should react to.
   */
  onPayloadReady!: (data: DuffelAPI.CreateOrderPayload) => void;

  /**
   * Definition of which attributes should trigger `attributeChangedCallback`
   */
  static get observedAttributes() {
    return ["offer", "passengers"];
  }

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    const container = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(container);

    this.root = createRoot(container);

    const serialisedOffer = this.getAttribute("offer");
    if (serialisedOffer) {
      const offer = JSON.parse(serialisedOffer);

      this.onPayloadReady = (data) => {
        this.dispatchEvent(
          new CustomEvent("onPayloadReady", {
            detail: data,
          })
        );
      };

      this.renderRoot(offer);
    } else {
      throw new Error("You must provide an offer");
    }
  }

  /**
   * This function will be called whenever one of the attributes given to it changes
   * @param name One of the attribute names defined on `observedAttributes`
   * @param oldValue The previous value for the attribute. Or null when this is called for the first time alongside `connectedCallback`
   * @param newValue The present value defined in the
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("attributeChangedCallback", [name, oldValue, newValue]);
    if (name === "offer" && oldValue !== null) {
      const offer = JSON.parse(newValue);
      this.renderRoot(offer);
    }
  }

  /**
   * A call to
   * @param withOffer The offer to be rendered inside `DuffelCheckout`
   */
  renderRoot(withOffer: DuffelAPI.Offer) {
    console.log("rendering root", withOffer);
    this.root.render(
      <DuffelCheckout offer={withOffer} onPayloadReady={this.onPayloadReady} />
    );
  }
}

export default DuffelCheckoutCustomElement;

window.customElements.get("duffel-checkout") ||
  window.customElements.define("duffel-checkout", DuffelCheckoutCustomElement);
