import { Page } from "puppeteer";

export const testDuffelAncillariesComponentIntegration = async (page: Page) => {
  // Wait for network requests to be completed
  await page.waitForNetworkIdle();

  await page.evaluate(async () => {
    // We'll use evaluate instead because the component DOM
    // is in the shadow root of <duffel-ancillaries />
    const duffelAncillariesShadowRoot =
      document.querySelector("duffel-ancillaries")!.shadowRoot;

    if (!duffelAncillariesShadowRoot) {
      throw new Error(
        `duffelAncillariesShadowRoot is ${duffelAncillariesShadowRoot}`
      );
    }

    // Baggage
    // open card
    const baggageCardButtonEl =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        ".ancillary-card:nth-child(1)"
      );
    if (!baggageCardButtonEl) throw new Error("baggageCardButtonEl is missing");
    baggageCardButtonEl.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to next flight
    const bagsNextButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        "[data-testid='confirm-selection-for-baggage']"
      );
    if (!bagsNextButton) throw new Error("bagsNextButton is missing");
    bagsNextButton.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to add bag
    const bagsPlusButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        "[title='Add one']"
      );
    if (!bagsPlusButton) throw new Error("bagsPlusButton is missing");
    bagsPlusButton.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to confirm and close
    const bagsConfirmButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        "[data-testid='confirm-selection-for-baggage']"
      );
    if (!bagsConfirmButton) throw new Error("bagsConfirmButton is missing");
    bagsConfirmButton.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Seats
    // open card
    const seatsCardButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        'button[title="Select seats"]'
      );
    if (!seatsCardButton) throw new Error("seatsCardButton is missing");
    seatsCardButton.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to select seat on first flight
    const seat1Button =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        ".map-element.map-element__seat.map-element--available.map-element--actionable"
      );
    if (!seat1Button) throw new Error("seat1Button is missing");
    seat1Button.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to next flight
    const seatsNextButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        "[data-testid='confirm-selection-for-seats']"
      );
    if (!seatsNextButton) throw new Error("seatsNextButton is missing");
    seatsNextButton.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to select seat on second flight
    const seat2Button =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        ".map-element.map-element__seat.map-element--available.map-element--actionable"
      );
    if (!seat2Button) throw new Error("seat2Button is missing");
    seat2Button.click();

    // wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // click to confirm and close
    const seatsConfirmButton =
      duffelAncillariesShadowRoot.querySelector<HTMLButtonElement>(
        "[data-testid='confirm-selection-for-seats']"
      );
    if (!seatsConfirmButton) throw new Error("seatsConfirmButton is missing");
    seatsConfirmButton.click();
  });

  page.on("response", (response) => {
    if (response.url().endsWith("/create-order")) {
      response.json().then((data) => {
        if (typeof data.data.id !== "string" || !data.data.id.startsWith("")) {
          throw new Error("The order was not created successfully");
        }

        if (
          !Array.isArray(data.data.services) ||
          // 3 services because it's 1 bag + 2 seats
          data.data.services.length !== 3
        ) {
          throw new Error(
            "The order was created but not all services are present in the order"
          );
        }
      });
    }
  });
};
