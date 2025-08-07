import { getTotalAmountForServices } from "../lib/getTotalAmountForServices";

describe("getTotalAmountForServices - seat markup priority fix", () => {
  it("should prioritize seat map prices over offer available_services for seat services", () => {
    // Mock offer with original seat service price
    const mockOffer = {
      id: "test_offer",
      available_services: [
        {
          id: "seat_service_1",
          total_amount: "23.39", // Original price
          total_currency: "EUR",
          metadata: { type: "seat" },
        },
      ],
      base_currency: "EUR",
    } as any;

    // Mock seat map with marked up price
    const mockSeatMaps = [
      {
        id: "test_seat_map",
        segment_id: "test_segment",
        cabins: [
          {
            rows: [
              {
                sections: [
                  {
                    elements: [
                      {
                        type: "seat" as const,
                        designator: "1A",
                        available_services: [
                          {
                            id: "seat_service_1",
                            total_amount: "25.73", // Marked up price (23.39 * 1.1)
                            total_currency: "EUR",
                            passenger_id: "test_passenger",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const selectedServices = [
      {
        id: "seat_service_1",
        quantity: 1,
      },
    ];

    const totalAmount = getTotalAmountForServices(
      mockOffer,
      selectedServices,
      mockSeatMaps,
    );

    // Should use the seat map price (25.73), not the offer price (23.39)
    expect(totalAmount).toBe(25.73);
  });

  it("should fall back to offer available_services when service not found in seat maps", () => {
    // Mock offer with baggage service
    const mockOffer = {
      id: "test_offer",
      available_services: [
        {
          id: "baggage_service_1",
          total_amount: "50.00",
          total_currency: "EUR",
          metadata: { type: "baggage" },
        },
      ],
      base_currency: "EUR",
    } as any;

    // Empty seat maps (baggage service won't be found here)
    const mockSeatMaps = [
      {
        id: "test_seat_map",
        segment_id: "test_segment",
        cabins: [],
      },
    ];

    const selectedServices = [
      {
        id: "baggage_service_1",
        quantity: 1,
      },
    ];

    const totalAmount = getTotalAmountForServices(
      mockOffer,
      selectedServices,
      mockSeatMaps,
    );

    // Should use the offer price since service not found in seat maps
    expect(totalAmount).toBe(50.0);
  });

  it("should handle mixed services correctly", () => {
    // Mock offer with both seat and baggage services
    const mockOffer = {
      id: "test_offer",
      available_services: [
        {
          id: "seat_service_1",
          total_amount: "23.39", // Original seat price
          total_currency: "EUR",
          metadata: { type: "seat" },
        },
        {
          id: "baggage_service_1",
          total_amount: "50.00", // Baggage price
          total_currency: "EUR",
          metadata: { type: "baggage" },
        },
      ],
      base_currency: "EUR",
    } as any;

    // Seat map with marked up seat price
    const mockSeatMaps = [
      {
        id: "test_seat_map",
        segment_id: "test_segment",
        cabins: [
          {
            rows: [
              {
                sections: [
                  {
                    elements: [
                      {
                        type: "seat" as const,
                        designator: "1A",
                        available_services: [
                          {
                            id: "seat_service_1",
                            total_amount: "25.73", // Marked up seat price
                            total_currency: "EUR",
                            passenger_id: "test_passenger",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const selectedServices = [
      {
        id: "seat_service_1",
        quantity: 1,
      },
      {
        id: "baggage_service_1",
        quantity: 1,
      },
    ];

    const totalAmount = getTotalAmountForServices(
      mockOffer,
      selectedServices,
      mockSeatMaps,
    );

    // Should use seat map price for seat (25.73) + offer price for baggage (50.00)
    expect(totalAmount).toBe(75.73);
  });

  it("should work when no seat maps provided (backward compatibility)", () => {
    const mockOffer = {
      id: "test_offer",
      available_services: [
        {
          id: "service_1",
          total_amount: "23.39",
          total_currency: "EUR",
        },
      ],
      base_currency: "EUR",
    } as any;

    const selectedServices = [
      {
        id: "service_1",
        quantity: 1,
      },
    ];

    // No seat maps provided
    const totalAmount = getTotalAmountForServices(mockOffer, selectedServices);

    // Should use offer price
    expect(totalAmount).toBe(23.39);
  });
});
