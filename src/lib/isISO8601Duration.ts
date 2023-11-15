export const iso8601DurationRegex =
  /P(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?/i;

export const isISO8601Duration = (durationString: string) => {
  return durationString.match(iso8601DurationRegex);
};
