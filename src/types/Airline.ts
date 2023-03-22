export interface Airline {
  /**
   * The two-character IATA code for the airline. This may be null for non-IATA carriers.
   */
  iata_code: string | null;

  /**
   * Duffel's unique identifier for the airline
   */
  id: string;

  /**
   * The name of the airline
   */
  name: string;
}
