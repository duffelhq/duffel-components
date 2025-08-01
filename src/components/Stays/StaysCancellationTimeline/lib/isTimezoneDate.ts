/**
 * Checks if an ISO string is a timezoned date.
 */

import { isValidDateString } from "@lib/isValidDateString";

export const isTimezoneDate = (date: string) => {
  if (!isValidDateString(date)) {
    return false;
  }

  return (
    date.endsWith("Z") || date.endsWith("+00:00") || date.endsWith("-00:00")
  );
};
