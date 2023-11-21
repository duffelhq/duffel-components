import { getDateObject } from "./getDateObject";

const formats = {
  short: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  shortWithTime: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  medium: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  mediumNoYear: {
    month: "short",
    day: "numeric",
  },
  mediumWithTime: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  },
  mediumWithTimeAndTimezone: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    hour12: true,
  },
  long: {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  longNoYear: {
    weekday: "short",
    month: "short",
    day: "numeric",
  },
  longWithTime: {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  },
  timeOnlyWithTimezone: {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  },
  timeOnly: {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
} as const;

export type DateTimeDisplayFormat = keyof typeof formats;

export const getDateString = (
  original: Date | string | null,
  format: DateTimeDisplayFormat,
  locale = "en-GB"
) => {
  if (!original) return "";
  const date =
    typeof original === "string" ? getDateObject(original) : original;
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, formats[format]).format(date);
};
