import * as React from "react";
import { makeMockPayloadForCreateOrder } from "../lib/makeMockPayloadForCreateOrder";
import { DuffelAPI } from "../types/DuffelAPI";

export const DuffelCheckoutCore: React.FC<{
  offer: DuffelAPI.Offer;
  onPayloadReady: (data: DuffelAPI.CreateOrderPayload) => void;
}> = ({ offer, onPayloadReady }) => {
  //testing that state works as expected
  const [name, setName] = React.useState("");

  return (
    <div>
      <h1>hello{name && `, ${name}`}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => onPayloadReady(makeMockPayloadForCreateOrder(offer.id))}
      >
        click this to return data
      </button>
      <pre>{JSON.stringify(offer, null, 2)}</pre>
    </div>
  );
};
