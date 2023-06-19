import {
  onDuffelPaymentsFailedPayment,
  onDuffelPaymentsSuccessfulPayment,
  renderDuffelPaymentsCustomElement,
} from "duffel-components/custom-elements";

window.onload = () => {
  renderDuffelPaymentsCustomElement({
    paymentIntentClientToken:
      "eyJjbGllbnRfc2VjcmV0IjoicGlfM0psczlVQWcySmhFeTh2WTBSTm1MU0JkX3NlY3JldF9QUW9yZXNuU3laeWJadGRiejZwNzBCbUdPIiwicHVibGlzaGFibGVfa2V5IjoicGtfdGVzdF9EQUJLY0E2Vzh6OTc0cTdPSWY0YmJ2MVQwMEpwRmMyOUpWIn0=",
  });
  onDuffelPaymentsFailedPayment((error) => console.error(error));
  onDuffelPaymentsSuccessfulPayment(() => console.log("Payment successful"));
};
