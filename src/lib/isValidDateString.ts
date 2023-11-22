/**
 * Checks if a string can be parsed into a JS date object
 *
 * @param date The string to be checked
 */
export const isValidDateString = (date: string) => !isNaN(Date.parse(date));
