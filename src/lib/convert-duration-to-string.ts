const iso8601DurationRegex = /P(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?/i;

export const convertDurationToString = (duration: string): string => {
  const matches = duration.match(iso8601DurationRegex);
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
};
