import { captureErrorInSentry } from "./captureErrorInSentry";

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  if (!isNaN(date.valueOf())) return formatDate(date);
  else {
    captureErrorInSentry(
      new Error("formatDateString attempted to parse an invalid date string"),
      {
        dateString,
      }
    );
  }
};

export const formatDate = (date: Date) => {
  const { format } = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  });
  return format(date);
};
