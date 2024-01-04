import { Page } from "puppeteer";

export const testDuffelAncillariesComponentIntegration = async (page: Page) => {
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

  // And this outside, because we are back to the regular DOM
  // Is the baggage price correct?
  const baggagePriceTableElementSelector =
    "#payment-breakdown-services-baggage-row > td.payment-breakdown__number-element";
  await page.waitForSelector(baggagePriceTableElementSelector);

  const baggagePriceTableElement = await page.$(
    baggagePriceTableElementSelector
  );
  const baggagePriceValue = await page.evaluate(
    (el) => el!.textContent!.trim(),
    baggagePriceTableElement
  );

  const baggageExpectedValue = "20.00";
  if (baggagePriceValue != baggageExpectedValue)
    throw new Error(
      `Baggage added to flight does not equal '${baggageExpectedValue}': ${baggagePriceValue}`
    );

  // Is the seats price correct?
  const seatsPriceTableElementSelector =
    "#payment-breakdown-services-seats-row > td.payment-breakdown__number-element";
  await page.waitForSelector(seatsPriceTableElementSelector);

  const seatsPriceTableElement = await page.$(seatsPriceTableElementSelector);
  const seatsPriceValue = await page.evaluate(
    (el) => el!.textContent?.trim(),
    seatsPriceTableElement
  );

  const seatsExpectedValue = "40.00";
  if (seatsPriceValue != seatsExpectedValue)
    throw new Error(
      `Seats added to flight does not equal '${seatsExpectedValue}': ${seatsPriceValue}`
    );
};
