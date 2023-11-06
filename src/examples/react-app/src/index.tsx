import { DuffelAncillaries, DuffelPayments } from "@duffel/components";
import React from "react";
import { createRoot } from "react-dom/client";

const App: React.FC = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "2rem" }}>
    <h1>Duffel ancillaries component react-app example</h1>

    <DuffelAncillaries
      offer_id="fixture_off_1"
      services={["bags", "seats"]}
      passengers={[
        {
          id: "pas_0000AUde3KY1SptM6ABSfU",
          given_name: "Mae",
          family_name: "Jemison",
          gender: "F",
          title: "dr",
          born_on: "1956-10-17",
          email: "m.jemison@nasa.gov",
          phone_number: "+16177562626",
        },
        {
          id: "pas_0000AUde3KY1SptM6ABSfT",
          given_name: "Dorothy",
          family_name: "Green",
          gender: "F",
          title: "dr",
          born_on: "1942-10-17",
        },
      ]}
      // eslint-disable-next-line
      onPayloadReady={console.log}
    />

    <DuffelPayments
      paymentIntentClientToken="eyJjbGllbnRfc2VjcmV0IjoicGlfM0psczlVQWcySmhFeTh2WTBSTm1MU0JkX3NlY3JldF9QUW9yZXNuU3laeWJadGRiejZwNzBCbUdPIiwicHVibGlzaGFibGVfa2V5IjoicGtfdGVzdF9EQUJLY0E2Vzh6OTc0cTdPSWY0YmJ2MVQwMEpwRmMyOUpWIn0="
      onSuccessfulPayment={console.log}
      onFailedPayment={console.log}
    />
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
