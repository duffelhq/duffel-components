import { City } from "./City";

export interface Airport {
  /**
   * The three-character IATA code for the airport
   */
  iata_code: string | null;

  /**
   * Duffel's unique identifier for the airport
   */
  id: string;

  /**
   * The name of the airport
   */
  name: string;

  /**
   * The ISO 3166-1 alpha-2 code for the country where the airport is located
   */
  iata_country_code: string;

  /**
   * The latitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -90° and 90°
   */
  latitude: number;

  /**
   * The longitude position of the airport represented in Decimal degrees with 6 decimal points with a range between -180° and 180°
   */
  longitude: number;

  /**
   * The four-character ICAO code for the airport
   */
  icao_code: string | null;

  /**
   * The time zone of the airport, specified by name from the [tz database](https://en.wikipedia.org/wiki/Tz_database)
   */
  time_zone: string;

  /**
   * The name of the city (or cities separated by a `/`) where the airport is located
   */
  city_name: string;

  /**
   * The metropolitan area where the airport is located.
   * Only present for airports which are registered with IATA as belonging to a metropolitan area.
   */
  city: City;
}
