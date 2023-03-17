import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { CreateOrderPayload } from "../types/CreateOrderPayload";
import { DuffelCheckout, DuffelCheckoutProps } from "./DuffelCheckout";

class DuffelCheckoutCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  root!: Root;

  /**
   * The callback users should react to.
   */
  onPayloadReady!: (data: CreateOrderPayload) => void;

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

    let { offer, passengers } = this.getAttributes();

    this.onPayloadReady = (data) => {
      this.dispatchEvent(
        new CustomEvent("onPayloadReady", {
          detail: data,
        })
      );
    };

    this.renderRoot({ offer, passengers });
  }

  getAttributes() {
    console.log("here");
    let serialisedOffer = this.getAttribute("offer");
    console.log(serialisedOffer);
    let offer = serialisedOffer && JSON.parse(serialisedOffer);
    console.log(offer);

    let serialisedPassengers = this.getAttribute("passengers");
    console.log(serialisedPassengers);
    let passengers = serialisedPassengers && JSON.parse(serialisedPassengers);
    console.log(passengers);

    return { offer, passengers };
  }

  /**
   * This function will be called whenever one of the attributes given to it changes
   * @param name One of the attribute names defined on `observedAttributes`
   * @param oldValue The previous value for the attribute. Or null when this is called for the first time alongside `connectedCallback`
   * @param newValue The present value defined in the
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    let { offer, passengers } = this.getAttributes();

    // TODO: throw helpful validation errors if props are missing or don't match the schema

    if (name === "offer" && oldValue !== null) {
      offer = JSON.parse(newValue);
    }
    if (name === "passengers" && oldValue !== null) {
      passengers = JSON.parse(newValue);
    }

    this.renderRoot({ offer, passengers });
  }

  /**
   * A call to
   * @param withOffer The offer to be rendered inside `DuffelCheckout`
   */
  renderRoot(withProps: {
    offer: DuffelCheckoutProps["offer"];
    passengers: DuffelCheckoutProps["passengers"];
  }) {
    console.log({ withProps });
    this.root.render(
      <DuffelCheckout {...withProps} onPayloadReady={this.onPayloadReady} />
    );
  }
}

export default DuffelCheckoutCustomElement;

window.customElements.get("duffel-checkout") ||
  window.customElements.define("duffel-checkout", DuffelCheckoutCustomElement);
