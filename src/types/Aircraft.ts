export interface Aircraft {
  /**
   * The three-character IATA code for the aircraft
   */
  iata_code: string;

  /**
   * Duffel's unique identifier for the aircraft
   */
  id: string;

  /**
   * The name of the aircraft
   */
  name: string;
}
