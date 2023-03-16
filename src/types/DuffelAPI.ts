export namespace DuffelAPI {
  export interface Offer {
    id: string;
  }

  export interface CreateOrderPayload {
    selected_offers: Array<Offer["id"]>;
  }
}
