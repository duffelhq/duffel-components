import { formatSeatMaps } from '../lib/formatSeatMaps';
import { createPriceFormatters } from '../lib/createPriceFormatters';
import { getTotalAmountForServices } from '../lib/getTotalAmountForServices';

describe('Seat markup bug reproduction', () => {
  it('should apply markup correctly to seat prices', () => {
    // Mock seat map data
    const mockSeatMap = [{
      id: "test_seat_map",
      cabins: [{
        rows: [{
          sections: [{
            elements: [{
              type: "seat" as const,
              designator: "1A",
              available_services: [{
                id: "test_service_1",
                total_amount: "23.39",
                total_currency: "EUR",
                passenger_id: "test_passenger"
              }]
            }]
          }]
        }]
      }]
    }];

    // Create price formatters with 10% markup
    const markup = {
      seats: { rate: 0.1, amount: 0 }
    };

    const priceFormatters = createPriceFormatters(markup);
    
    // Apply formatting
    const formattedSeatMaps = formatSeatMaps(mockSeatMap, priceFormatters.seats);
    
    const originalAmount = parseFloat(mockSeatMap[0].cabins[0].rows[0].sections[0].elements[0].available_services[0].total_amount);
    const formattedAmount = parseFloat(formattedSeatMaps[0].cabins[0].rows[0].sections[0].elements[0].available_services[0].total_amount);
    
    // Expected: 23.39 * 1.1 = 25.729
    const expectedAmount = 23.39 * 1.1;
    
    console.log("Original amount:", originalAmount);
    console.log("Formatted amount:", formattedAmount);
    console.log("Expected amount:", expectedAmount);
    
    expect(formattedAmount).toBeCloseTo(expectedAmount, 2);
  });

  it('should calculate total amount correctly with markup when using seat maps', () => {
    // Mock offer (empty available_services to force using seat maps)
    const mockOffer = {
      id: "test_offer",
      available_services: [],
      base_currency: "EUR"
    } as any;

    // Mock seat map data
    const mockSeatMap = [{
      id: "test_seat_map",
      cabins: [{
        rows: [{
          sections: [{
            elements: [{
              type: "seat" as const,
              designator: "1A",
              available_services: [{
                id: "test_service_1",
                total_amount: "23.39",
                total_currency: "EUR",
                passenger_id: "test_passenger"
              }]
            }]
          }]
        }]
      }]
    }];

    // Create price formatters with 10% markup
    const markup = {
      seats: { rate: 0.1, amount: 0 }
    };

    const priceFormatters = createPriceFormatters(markup);
    
    // Apply formatting
    const formattedSeatMaps = formatSeatMaps(mockSeatMap, priceFormatters.seats);
    
    // Mock selected service (this simulates what SeatElement creates)
    const selectedServices = [{
      id: "test_service_1",
      quantity: 1
    }];

    // Calculate total using formatted seat maps
    const totalAmount = getTotalAmountForServices(mockOffer, selectedServices, formattedSeatMaps);
    
    // Expected: 23.39 * 1.1 = 25.729
    const expectedAmount = 23.39 * 1.1;
    
    console.log("Total amount calculated:", totalAmount);
    console.log("Expected amount:", expectedAmount);
    
    expect(totalAmount).toBeCloseTo(expectedAmount, 2);
  });
});