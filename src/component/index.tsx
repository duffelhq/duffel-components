import * as React from "react";
import { createRoot } from "react-dom/client";
import { DuffelCheckoutCore } from "./DuffelCheckoutCore";

class DuffelCheckout extends HTMLElement {
  mountPoint!: HTMLSpanElement;
  name!: string;

  // The connectedCallback() runs each time the element is added to the DOM
  connectedCallback() {
    const container = document.createElement("div");
    const root = createRoot(container);
    this.attachShadow({ mode: "open" }).appendChild(container);

    const serialisedOffer = this.getAttribute("offer");
    if (serialisedOffer) {
      // this will eventually just be an offer id and we won't need to parse it
      const offer = JSON.parse(serialisedOffer);

      root.render(
        <DuffelCheckoutCore
          offer={offer}
          onPayloadReady={(data) => {
            this.dispatchEvent(
              new CustomEvent("onPayloadReady", {
                detail: data,
              })
            );
          }}
        />
      );
    } else {
      console.error("You must provide an offer");
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("attributeChangedCallback", [name, oldValue, newValue]);
  }
}
export default DuffelCheckout;

window.customElements.get("duffel-checkout") ||
  window.customElements.define("duffel-checkout", DuffelCheckout);
