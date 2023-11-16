export const getLayoverOriginDestinationKey = (
  from?: string | null,
  at?: string | null,
  to?: string | null
) => from + "-" + at + "-" + to;
