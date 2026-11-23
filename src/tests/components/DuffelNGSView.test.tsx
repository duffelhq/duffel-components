import { OfferRequest } from "@duffel/api/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { DuffelNGSView } from "../../components/DuffelNGSView/DuffelNGSView";
import { DuffelNGSViewOfferRequest } from "../../components/DuffelNGSView/lib/types";

/* eslint-disable @typescript-eslint/no-var-requires */
const fullOfferRequest: OfferRequest = require("../../fixtures/offer-requests/orq_0000Ab7taNqbK8y5YqW6Zk.json");
/* eslint-enable @typescript-eslint/no-var-requires */

// Holds only the fields `DuffelNGSViewOfferRequest` lists.
const trimmedOfferRequest: DuffelNGSViewOfferRequest = {
  slices: [
    {
      departure_date: "2026-12-01",
      origin: { iata_code: "LHR" },
      destination: { iata_code: "JFK", name: "John F. Kennedy International" },
    },
  ],
  offers: [
    {
      id: "off_trimmed",
      total_amount: "321.00",
      total_currency: "GBP",
      owner: { iata_code: "BA", name: "British Airways" },
      conditions: {
        change_before_departure: null,
        refund_before_departure: null,
      },
      slices: [
        {
          ngs_shelf: 1,
          fare_brand_name: null,
          duration: "PT8H",
          origin: { iata_code: "LHR" },
          destination: { iata_code: "JFK" },
          conditions: {
            change_before_departure: null,
            refund_before_departure: null,
            advance_seat_selection: null,
            priority_boarding: null,
            priority_check_in: null,
          },
          segments: [
            {
              marketing_carrier_flight_number: "117",
              departing_at: "2026-12-01T10:00:00",
              arriving_at: "2026-12-01T13:00:00",
              duration: "PT8H",
              origin: { iata_code: "LHR", name: "Heathrow" },
              destination: {
                iata_code: "JFK",
                name: "John F. Kennedy International",
              },
              marketing_carrier: { iata_code: "BA", name: "British Airways" },
              operating_carrier: { name: "British Airways" },
              aircraft: { name: "Airbus A350" },
              stops: [],
              passengers: [
                {
                  cabin_class: "economy",
                  cabin_class_marketing_name: "Economy",
                  baggages: [{ type: "checked", quantity: 1 }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("DuffelNGSView", () => {
  test("draws and selects an offer that holds only the listed fields", () => {
    const onSelect = jest.fn();
    const { container } = render(
      <DuffelNGSView offerRequest={trimmedOfferRequest} onSelect={onSelect} />,
    );

    expect(
      screen.getByText("Flight to John F. Kennedy International"),
    ).toBeTruthy();

    fireEvent.click(container.querySelector("td.ngs-table_table-data")!);
    fireEvent.click(screen.getByText("Select"));

    expect(onSelect).toHaveBeenCalledWith("off_trimmed");
  });

  test("still accepts a full offer request", () => {
    render(
      <DuffelNGSView offerRequest={fullOfferRequest} onSelect={jest.fn()} />,
    );

    expect(screen.getAllByText("View details").length).toBeGreaterThan(0);
  });
});
