export interface CurrencyConversion {
  /**
   * currency The ISO-4217 currency code to be used
   */
  currency: string;
  /**
   * Conversion multiple to be applied to all prices
   */
  rate: number;
}
