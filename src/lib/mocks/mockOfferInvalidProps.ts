/*
  This mock is a contrived example of an offer, passengers and seatMaps with invalid types.
  - offer - missing slices
  - passengers - missing id
  - seatMaps - missing id
*/
export const mockOfferInvalidProps: any = {
  offer: {
    passengers: [
      {
        type: "adult",
        id: "pas_0000A8oTVsAt8YurG9h4xn",
      },
    ],
    owner: {
      name: "Duffel Airways",
      id: "arl_00009VME7D6ivUu8dn35WK",
      iata_code: "ZZ",
    },
    id: "off_0000A8oTVsP4HqG5y8KP46",
    conditions: {
      refund_before_departure: {
        allowed: false,
      },
      change_before_departure: {
        allowed: true,
        penalty_currency: "GBP",
        penalty_amount: "470.00",
      },
    },
    updated_at: "2021-06-30T13:45:51.377737Z",
    total_emissions_kg: "863",
    total_currency: "GBP",
    total_amount: "2748.65",
    tax_currency: "GBP",
    tax_amount: "419.29",
    payment_requirements: {
      requires_instant_payment: false,
      price_guarantee_expires_at: "2021-07-02T13:45:51Z",
      payment_required_by: "2021-07-03T13:45:51Z",
    },
    passenger_identity_documents_required: false,
    live_mode: false,
    expires_at: "2021-06-30T14:00:51.375243Z",
    created_at: "2021-06-30T13:45:51.377737Z",
    base_currency: "GBP",
    base_amount: "2329.36",
    available_services: [],
    allowed_passenger_identity_document_types: [],
  },
  passengers: [
    {
      name: "Amelia Earhart",
    },
  ],
  seatMaps: [
    {
      cabins: [
        {
          wings: {
            last_row_index: 1,
            first_row_index: 0,
          },
          rows: [
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "28A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "28B",
                      available_services: [
                        {
                          id: "ase_0000A8okiQhes3xbKYwUS1",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [
                        "Passenger must be an adult",
                        "Do not seat passengers with special needs in exit row seats or bulkheads",
                      ],
                      designator: "28C",
                      available_services: [
                        {
                          id: "ase_0000A8okiQhes3xbKYwUSz",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "28D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [
                        "Passenger must be an adult",
                        "Do not seat passengers with special needs in exit row seats or bulkheads",
                      ],
                      designator: "28E",
                      available_services: [
                        {
                          id: "ase_0000A8okiQhes3xbKYwUT4",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "28F",
                      available_services: [
                        {
                          id: "ase_0000A8okiQhes3xbKYwUT7",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [
                        "Passenger must be an adult",
                        "Do not seat passengers with special needs in exit row seats or bulkheads",
                      ],
                      designator: "28H",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [
                        "Passenger must be an adult",
                        "Do not seat passengers with special needs in exit row seats or bulkheads",
                      ],
                      designator: "28J",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "28K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29B",
                      available_services: [
                        {
                          id: "ase_0000A8okiQi0qkFBLf6m17",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29C",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29H",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29J",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "29K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30B",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30C",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQi0qkFBLf6m1T",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30J",
                      available_services: [
                        {
                          id: "ase_0000A8okiQi0qkFBLf6m1W",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "30K",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiMpQWlMlH3ZK",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31B",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiMpQWlMlH3ZQ",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31C",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31D",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiMpQWlMlH3ZV",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiMpQWlMlH3Zb",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31J",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "31K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32A",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiMpQWlMlH3Zi",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32B",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32C",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiio6oLNrRL7a",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32F",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiio6oLNrRL7g",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiio6oLNrRL7k",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32J",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiio6oLNrRL7n",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "32K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33B",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33C",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33D",
                      available_services: [
                        {
                          id: "ase_0000A8okiQiio6oLNrRL7x",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33F",
                      available_services: [
                        {
                          id: "ase_0000A8okiQj4mn5vOxbcfq",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQj4mn5vOxbcfu",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33J",
                      available_services: [
                        {
                          id: "ase_0000A8okiQj4mn5vOxbcfx",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "33K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34B",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34C",
                      available_services: [
                        {
                          id: "ase_0000A8okiQj4mn5vOxbcg5",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34E",
                      available_services: [
                        {
                          id: "ase_0000A8okiQjQlTNVQ3luE8",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34H",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34J",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "34K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35A",
                      available_services: [
                        {
                          id: "ase_0000A8okiQjQlTNVQ3luEI",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35B",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35C",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35D",
                      available_services: [
                        {
                          id: "ase_0000A8okiQjQlTNVQ3luEO",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQjmk9f5R9wBmP",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35J",
                      available_services: [
                        {
                          id: "ase_0000A8okiQjmk9f5R9wBmS",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "35K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "lavatory",
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "lavatory",
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "lavatory",
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "exit_row",
                    },
                  ],
                },
                {
                  elements: [],
                },
                {
                  elements: [
                    {
                      type: "exit_row",
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36A",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCT",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36B",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCW",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36C",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCZ",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36E",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCe",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36F",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCh",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36H",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36J",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmcZbvjZxGSCm",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "36K",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmyYIDJb3Qjkg",
                          total_currency: "GBP",
                          total_amount: "20.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37A",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37B",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmyYIDJb3Qjkm",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37C",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmyYIDJb3Qjkp",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37D",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37E",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37F",
                      available_services: [],
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37H",
                      available_services: [
                        {
                          id: "ase_0000A8okiQmyYIDJb3Qjkx",
                          total_currency: "GBP",
                          total_amount: "0.0",
                          passenger_id: "pas_0000A8oTVsAt8YurG9h4xn",
                        },
                      ],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37J",
                      available_services: [],
                    },
                    {
                      type: "seat",
                      name: "",
                      disclosures: [],
                      designator: "37K",
                      available_services: [],
                    },
                  ],
                },
              ],
            },
            {
              sections: [
                {
                  elements: [
                    {
                      type: "galley",
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "galley",
                    },
                  ],
                },
                {
                  elements: [
                    {
                      type: "galley",
                    },
                  ],
                },
              ],
            },
          ],
          deck: 0,
          aisles: 2,
          cabin_class: "economy",
        },
      ],
      slice_id: "sli_0000A8oTVsOiJ9yVx2A7Vp",
      segment_id: "seg_0000A8oTVsOiJ9yVx2A7Vo",
    },
  ],
};
