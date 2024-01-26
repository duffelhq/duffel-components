const MS = 1000;
const MS_PER_MINUTE = MS * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export function getDurationString(
  start: Date | string,
  end: Date | string,
  format?: "long",
): string {
  let startDate: Date = typeof start === "string" ? new Date(start) : start;
  let prefix = "";

  let endDate = new Date();
  if (end) {
    if (typeof end === "string") {
      endDate = new Date(end);
    } else {
      endDate = end;
    }
  }

  // If the end date is before the start date, this usually indicates an error
  // But we still want to make sure we show that to the user nicely
  if (endDate < startDate) {
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
    prefix = "-";
  }

  const diff = endDate.valueOf() - startDate.valueOf();

  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff - days * MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor(
    (diff - days * MS_PER_DAY - hours * MS_PER_HOUR) / MS_PER_MINUTE,
  );

  let daysString = "";
  let hoursString = "";
  let minutesString = "";

  let suffix = "";

  if (format !== "long") {
    daysString = days ? `${days}d` : "";
    hoursString = hours ? `${hours.toString().padStart(2, "0")}h` : "";
    minutesString = minutes ? `${minutes.toString().padStart(2, "0")}m` : "";
  } else {
    if (days >= 1) {
      daysString = `${days}d`;
    }

    if (hours >= 1) {
      hoursString = `${hours.toString()}h`;
    }

    if (minutes >= 1) {
      minutesString = `${minutes.toString()}m`;
    }

    suffix = end < start ? "earlier" : "later";
  }

  return format !== "long"
    ? prefix + `${daysString} ${hoursString} ${minutesString}`.trim()
    : `${daysString} ${hoursString} ${minutesString} ${suffix}`.trim();
}
