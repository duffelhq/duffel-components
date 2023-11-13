import { isISO8601Duration } from "./isISO8601Duration";

export function convertDurationToString(duration: string): string {
  const matches = isISO8601Duration(duration);
  if (!matches) return duration;

  const daysString = matches[1] && matches[1] !== "0" ? `${matches[1]}d` : "";
  const hoursString =
    matches[2] && matches[2] !== "0"
      ? `${matches[2].toString().padStart(2, "0")}h`
      : "";
  const minutesString =
    matches[3] && matches[3] !== "0"
      ? `${matches[3].toString().padStart(2, "0")}m`
      : "";

  return `${daysString} ${hoursString} ${minutesString}`.trim();
}
