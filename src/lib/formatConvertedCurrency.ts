export const formatConvertedCurrency = (
  amount: string,
  currency: string,
  rate = 1,
  withoutSymbol = false
) => {
  const convertedAmount = +amount * rate;
  return withoutSymbol
    ? moneyStringFormatterWithoutSymbol(currency)(convertedAmount)
    : moneyStringFormatter(currency)(convertedAmount);
};

/**
 * Returns a function to format a number into a money amount for a given currency without the currency symbol
 *
 * @param currency The ISO-4217 currency code to be used by the formatter
 */
export const moneyStringFormatterWithoutSymbol = (
  currency: string,
  locale = "en-GB"
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "code",
  });
  return (value: number) =>
    formatter
      .format(value)
      .replace(/[a-z]{3}/i, "")
      .trim();
};

/**
 * Return a function to format a number into a money amount for a given currency
 *
 * @param currency The ISO-4217 currency code to be used by the formatter
 */
export const moneyStringFormatter = (
  currency: string,
  locale = "en-GB",
  options: { [option: string]: string } = {}
) => {
  return (value: number) => {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        ...options,
      });
      const numberFormatted = formatter.format(value);
      const signFormatted =
        options &&
        options["signDisplay"] &&
        (options["signDisplay"] === "always" ||
          (options["signDisplay"] === "exceptZero" && value !== 0))
          ? numberFormatted.replace(/^([+-])/, "$1 ")
          : numberFormatted;

      return signFormatted;
    } catch (error) {
      // If the currency is not supported by the browser, we return the value with the currency code.
      // This allows us to support made-up currencies, like "1000 Duffel Points"
      return `${value} ${currency}`;
    }
  };
};
