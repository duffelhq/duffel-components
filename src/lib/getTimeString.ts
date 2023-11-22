export const getTimeString = (original: Date | string, locale = "en-GB") => {
  const date = typeof original === "string" ? new Date(original) : original;
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
};
