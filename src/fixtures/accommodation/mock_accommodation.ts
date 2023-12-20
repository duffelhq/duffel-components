import { StaysAccommodation } from "@duffel/api/types";

export const mockAccommodation: StaysAccommodation = {
  id: "acc_0000AWr2VsUNIF1Vl91xg0",
  amenities: [
    {
      type: "parking",
      description: "Parking",
    },
    {
      type: "gym",
      description: "Gym",
    },
    {
      type: "wifi",
      description: "Wi-Fi",
    },
    {
      type: "24_hour_front_desk",
      description: "24-Hour Front Desk",
    },
    {
      type: "accessibility_hearing",
      description: "Hearing Impaired Services",
    },
    {
      type: "accessibility_mobility",
      description: "Wheelchair Access",
    },
    {
      type: "adult_only",
      description: "Adult Only",
    },
    {
      type: "business_centre",
      description: "Business Centre",
    },
    {
      type: "cash_machine",
      description: "Cash Machine",
    },
    {
      type: "childcare_service",
      description: "Childcare Services",
    },
    {
      type: "concierge",
      description: "Concierge",
    },
    {
      type: "laundry",
      description: "Laundry Service",
    },
    {
      type: "lounge",
      description: "Lounge",
    },
    {
      type: "pets_allowed",
      description: "Pets Allowed",
    },
    {
      type: "pool",
      description: "Swimming Pool",
    },
    {
      type: "restaurant",
      description: "Restaurant",
    },
    {
      type: "room_service",
      description: "Room Service",
    },
    {
      type: "spa",
      description: "Spa",
    },
  ],
  description:
    "On the Freedom Trail and a short walk from Boston Common, this luxury historic hotel features a full-service restaurant, a 24-hour business center, and WiFi. Thirteen historic sites from the Freedom Trail are in close proximity.",
  ratings: [
    {
      value: 4,
      source: "aaa",
    },
  ],
  rating: 4,
  review_score: 8.8,
  rooms: [
    {
      rates: [
        {
          total_currency: "GBP",
          total_amount: "799.00",
          tax_currency: "GBP",
          tax_amount: "133.17",
          supplier: "priceline",
          payment_type: "pay_now",
          id: "rat_0000ASuebQfixzpI2v20qe",
          due_at_accommodation_currency: "USD",
          due_at_accommodation_amount: null,
          conditions: [
            {
              title: "Parking",
              description: "Public parking is available nearby for £15 per day",
            },
          ],
          base_currency: "GBP",
          base_amount: "625.83",
          fee_currency: "GBP",
          fee_amount: "40.00",
          cancellation_timeline: [],
          board_type: "room_only",
          payment_method: "balance",
          quantity_available: 1,
          supported_loyalty_programme: null,
        },
        {
          total_currency: "GBP",
          total_amount: "899.00",
          tax_currency: "GBP",
          tax_amount: "133.17",
          supplier: "priceline",
          payment_type: "pay_now",
          id: "rat_0000ASuebQfixzpI2v20bx",
          due_at_accommodation_currency: "GBP",
          due_at_accommodation_amount: "39.95",
          conditions: [
            {
              title: "Parking",
              description: "Public parking is available nearby for £15 per day",
            },
            {
              title: "Refundable",
              description: "This rate is fully refundable.",
            },
          ],
          base_currency: "GBP",
          base_amount: "765.83",
          fee_currency: "GBP",
          fee_amount: "40.00",
          cancellation_timeline: [
            {
              refund_amount: "800",
              currency: "GBP",
              before: "2021-08-01T00:00:00Z",
            },
          ],
          board_type: "all_inclusive",
          payment_method: "card",
          quantity_available: 1,
          supported_loyalty_programme: "duffel_hotel_group_rewards",
        },
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
        },
        {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
        },
      ],
      name: "Double Suite",
      beds: [
        {
          type: "double",
          count: 2,
        },
        {
          type: "single",
          count: 1,
        },
      ],
    },
  ],
  photos: [
    {
      url: "https://images.unsplash.com/photo-1584218896971-bf6d300b35ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1641063719037-6e3d561de978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1592839494881-40d0e657099b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80",
    },
  ],
  phone_number: "+44 20 7493 8181",
  name: "The Ritz London",
  location: {
    geographic_coordinates: {
      longitude: -0.1416,
      latitude: 51.5071,
    },
    address: {
      region: "England",
      postal_code: "W1J 9BR",
      line_one: "150 Piccadilly",
      country_code: "GB",
      city_name: "London",
    },
  },
  email: "reservations@theritzlondon.com",
  check_in_information: {
    check_out_before_time: "11:30",
    check_in_after_time: "14:30",
  },
  cheapest_rate_total_amount: "799.00",
  cheapest_rate_currency: "GBP",
  chain: {
    name: "The Ritz-Carlton",
  },
};
