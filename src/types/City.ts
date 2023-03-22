export interface City {
  /**
   * The three-character IATA code for the city
   */
  iata_code: string;

  /**
   * Duffel's unique identifier for the city
   */
  id: string;

  /**
   * The ISO 3166-1 alpha-2 code for the country where the city is located
   */
  iata_country_code: string;

  /**
   * The name of the city
   */
  name: string;
}
