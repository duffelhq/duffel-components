import { DuffelAncillaries } from "@components/DuffelAncillaries";
import { fireEvent, render } from "@testing-library/react";
import { SeatMap } from "src/types/SeatMap";
import { Offer } from "../types/Offer";
import { CreateOrderPayload } from "../types/CreateOrderPayload";
import { OnPayloadReady } from "src/types/DuffelAncillariesProps";

/* eslint-disable @typescript-eslint/no-var-requires */
const MOCK_OFFER: Offer = require("../fixtures/offers/off_1.json");
const MOCK_SEAT_MAPS: SeatMap[] = require("../fixtures/seat-maps/off_1.json");
const MOCK_PASSENGERS: CreateOrderPayload["passengers"] = require("../fixtures/passengers/mock_passengers.json");
/* eslint-enable @typescript-eslint/no-var-requires */

describe("DuffelAncillaries", () => {
  test("should throw an error when services is empty", () => {
    expect(() =>
      render(
        <DuffelAncillaries
          onPayloadReady={jest.fn()}
          passengers={[]}
          services={[]}
          offer_id="offer_id"
          client_key="client_key"
        />
      )
    ).toThrow(
      'You must provide at least one service in the "services" prop. Valid services: ["bags", "seats"]'
    );
  });

  test("should select baggage services", async () => {
    let onPayloadReadyCallCount = 0;
    const onPayloadReady: OnPayloadReady = jest.fn((data, metadata) => {
      if (++onPayloadReadyCallCount === 2) {
        expect(data.selected_offers[0]).toBe(MOCK_OFFER.id);
        expect(metadata.baggage_services.length).toBe(2);
      }
    });
    const { getByText, getByTestId, getByTitle } = render(
      <DuffelAncillaries
        onPayloadReady={onPayloadReady}
        offer={MOCK_OFFER}
        seat_maps={MOCK_SEAT_MAPS}
        passengers={MOCK_PASSENGERS}
        services={["bags", "seats"]}
        client_key="client_key"
      />
    );

    fireEvent.click(getByTitle("Select extra baggage"));

    // There are no services for the first segment of the offer.
    fireEvent.click(getByTestId("confirm-selection"));

    for (const available_service of MOCK_OFFER.available_services) {
      if (available_service.type !== "baggage") continue;

      for (const passengerId of available_service.passenger_ids) {
        const testId = `counter--${available_service.id}--${passengerId}-plus`;
        const addBaggageButton = getByTestId(testId);
        fireEvent.click(addBaggageButton);
      }
    }

    fireEvent.click(getByTestId("confirm-selection"));
    expect(getByText(/2 bags added/i));

    // The component is always called at least once
    // when the state is set with an offer.
    expect(onPayloadReady).toBeCalledTimes(2);
  });

  test("should select seat services", () => {
    let onPayloadReadyCallCount = 0;
    const onPayloadReady: OnPayloadReady = jest.fn((data, metadata) => {
      if (++onPayloadReadyCallCount === 2) {
        expect(data.selected_offers[0]).toBe(MOCK_OFFER.id);
        expect(metadata.seat_services.length).toBe(4);
      }
    });
    const { getByText, getByTestId, getByTitle } = render(
      <DuffelAncillaries
        onPayloadReady={onPayloadReady}
        offer={MOCK_OFFER}
        seat_maps={MOCK_SEAT_MAPS}
        passengers={MOCK_PASSENGERS}
        services={["bags", "seats"]}
        client_key="client_key"
      />
    );

    const seatCard = getByTitle("Select seats");
    fireEvent.click(seatCard);

    fireEvent.click(getByTestId("seat-28E"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28F"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28E"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28F"));
    fireEvent.click(getByTestId("confirm-selection"));

    expect(getByText(/4 seats selected/i));

    // The component is always called at least once
    // when the state is set with an offer.
    expect(onPayloadReady).toBeCalledTimes(2);
  });

  test("should work with custom markup and currency", () => {
    let onPayloadReadyCallCount = 0;
    const onPayloadReady: OnPayloadReady = jest.fn((data, metadata) => {
      if (++onPayloadReadyCallCount === 2) {
        expect(data.selected_offers[0]).toBe(MOCK_OFFER.id);
        expect(metadata.baggage_services.length).toBe(2);
      }
    });
    const { getByText, getByTestId, getByTitle } = render(
      <DuffelAncillaries
        onPayloadReady={onPayloadReady}
        offer={MOCK_OFFER}
        seat_maps={MOCK_SEAT_MAPS}
        passengers={MOCK_PASSENGERS}
        services={["bags", "seats"]}
        client_key="client_key"
        priceFormatters={{
          bags: (amount) => {
            return {
              amount: amount * 2,
              currency: "Duffel house points",
            };
          },
          seats: (amount) => {
            return {
              amount: amount / 2,
              currency: "Duffel house points",
            };
          },
        }}
      />
    );

    /**
     * First, select bags.
     */

    fireEvent.click(getByTitle("Select extra baggage"));

    // There are no services for the first segment of the offer.
    fireEvent.click(getByTestId("confirm-selection"));

    const totalPriceLabel = getByTestId("baggage-total-amount-label");
    expect(totalPriceLabel.textContent).toBe("+ 0 Duffel house points");

    for (const available_service of MOCK_OFFER.available_services) {
      if (available_service.type !== "baggage") continue;

      for (const passengerId of available_service.passenger_ids) {
        const priceLabelTestId = `price-label--${available_service.id}--${passengerId}`;
        const priceLabel = getByTestId(priceLabelTestId);
        expect(priceLabel.textContent).toBe("80 Duffel house points");

        const addButtonTestId = `counter--${available_service.id}--${passengerId}-plus`;
        const addBaggageButton = getByTestId(addButtonTestId);
        fireEvent.click(addBaggageButton);
      }
    }

    // Price should now have been updated.
    expect(totalPriceLabel.textContent).toBe("+ 160 Duffel house points");

    fireEvent.click(getByTestId("confirm-selection"));
    expect(getByText(/2 bags added for 160 Duffel house points/i));

    /**
     * Now, select seats.
     */

    const seatCard = getByTitle("Select seats");
    fireEvent.click(seatCard);

    fireEvent.click(getByTestId("seat-28E"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28F"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28E"));
    fireEvent.click(getByTestId("confirm-selection"));

    fireEvent.click(getByTestId("seat-28F"));
    fireEvent.click(getByTestId("confirm-selection"));

    expect(getByText(/4 seats selected for 40 Duffel house points/i));

    // The component is always called at least once
    // when the state is set with an offer.
    expect(onPayloadReady).toBeCalledTimes(3);
  });
});
