import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import {
  CreateOrderPayload,
  CreateOrderPayloadPassengers,
} from "../types/CreateOrderPayload";
import { DuffelCheckout, DuffelCheckoutProps } from "./DuffelCheckout";

interface DuffelCheckoutCustomElementInitData {
  passengers: CreateOrderPayloadPassengers;
}

class DuffelCheckoutCustomElement extends HTMLElement {
  /**
   * The React root for displaying content inside a browser DOM element.
   */
  root!: Root;

  passengers!: CreateOrderPayloadPassengers | null;

  /**
   * The callback users should react to.
   */
  onPayloadReady!: (data: CreateOrderPayload) => void;

  /**
   * Definition of which attributes should trigger `attributeChangedCallback`
   */
  static get observedAttributes() {
    return ["offer_id", "client_key"];
  }

  getAttributes() {
    const offer_id = this.getAttribute("offer_id") || "";
    const client_key = this.getAttribute("client_key") || "";

    return { offer_id, client_key };
  }

  storeData({ passengers }: DuffelCheckoutCustomElementInitData) {
    this.passengers = passengers;
  }

  /**
   * `connectedCallback` is called to initialise the custom element
   */
  connectedCallback() {
    let { offer_id, client_key } = this.getAttributes();
    const container = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(container);

    this.root = createRoot(container);

    this.onPayloadReady = (data) => {
      this.dispatchEvent(
        new CustomEvent("onPayloadReady", {
          detail: data,
        })
      );
    };

    setTimeout(() => this.dispatchConnectedCallback(offer_id, client_key), 100);
  }

  dispatchConnectedCallback(offer_id: string, client_key: string) {
    this.dispatchEvent(
      new CustomEvent("connectedCallback", {
        detail: (data: DuffelCheckoutCustomElementInitData) => {
          this.storeData(data);

          // TODO: find better way to handle missing passenger
          if (!this.passengers) return;
          this.renderRoot({
            offer_id,
            client_key,
            passengers: this.passengers,
          });
        },
      })
    );
  }

  /**
   * This function will be called whenever one of the attributes given to it changes
   * @param name One of the attribute names defined on `observedAttributes`
   * @param oldValue The previous value for the attribute. Or null when this is called for the first time alongside `connectedCallback`
   * @param newValue The present value defined in the
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    let { offer_id, client_key } = this.getAttributes();

    // TODO: throw helpful validation errors if props are missing or don't match the schema

    if (name === "offer_id" && oldValue !== null) {
      offer_id = newValue;
    }
    if (name === "client_key" && oldValue !== null) {
      client_key = newValue;
    }

    // TODO: find better way to handle missing passenger
    if (!this.passengers) return;

    this.renderRoot({ offer_id, client_key, passengers: this.passengers });
  }

  renderRoot(withProps: {
    offer_id: DuffelCheckoutProps["offer_id"];
    client_key: DuffelCheckoutProps["client_key"];
    passengers: DuffelCheckoutProps["passengers"];
  }) {
    this.root?.render(
      <DuffelCheckout {...withProps} onPayloadReady={this.onPayloadReady} />
    );
  }
}

export default DuffelCheckoutCustomElement;

window.customElements.get("duffel-checkout") ||
  window.customElements.define("duffel-checkout", DuffelCheckoutCustomElement);
