import { isValidDateString } from "./isValidDateString";

/**
 * Creates JS date object based on an ISO string.
 * It adds a safe times to date only strings so it can be safely used by Intl
 * without breaking based on locale.
 *
 * This function return null if the string cannot be parsed into a Date
 *
 * @param fromISO The ISO-8601 date string to be  converted into a JS date object
 */
export const getDateObject = (fromISO: string): Date | null => {
  if (!isValidDateString(fromISO)) return null;

  if (fromISO.match(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/)) {
    return new Date(fromISO);
  } else {
    if (fromISO.includes("/")) {
      return new Date(`${fromISO} 12:00:00 UTC`);
    } else {
      return new Date(`${fromISO}T12:00:00Z`);
    }
  }
};
