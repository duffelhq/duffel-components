import { getDateString } from "@lib/getDateString";
import { isTimezoneDate } from "./isTimezoneDate";
import { format } from "date-fns-tz";

export const renderTimelineDateTime = (
  date: string,
  showTime = true,

  /**
   * The timezone of `date` if a designator is not included. If not provided,
   * the date is assumed to be in a timezone local to the timeline event (e.g
   * flight departure).
   */
  dateTimeZone?: string,
) => {
  const dateHasTimezoneDesignator = isTimezoneDate(date);

  return (
    <div style={!showTime ? { marginTop: "var(--space-20)" } : undefined}>
      <p
        style={{
          color: "var(--GREY-600)",
          fontWeight: "medium",
          fontSize: "12px",
          lineHeight: "20px",
        }}
      >
        {getDateString(date, "medium")}
      </p>
      {showTime && (
        <p
          style={{
            color: "var(--GREY-600)",
            fontSize: "12px",
            lineHeight: "20px",
          }}
        >
          {getDateString(
            date,
            dateHasTimezoneDesignator ? "timeOnlyWithTimezone" : "timeOnly",
          )}
          {!dateHasTimezoneDesignator &&
            (dateTimeZone
              ? ` ${format(new Date(date), "z", { timeZone: dateTimeZone })}`
              : " local")}
        </p>
      )}
    </div>
  );
};
