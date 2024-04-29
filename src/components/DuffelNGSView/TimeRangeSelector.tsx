import Slider from "rc-slider";
import React from "react";
import { FilterControl } from "./FilterControl";
import { Filters } from "./lib/filter-results";

type Range = Filters["times"]["departure"];

const targetLabelConectors = {
  before: " before ",
  after: " after ",
  between: " between ",
};

function getTargetLabel(selectedRange: Filters["times"]) {
  const [departureStart, departureEnd] = selectedRange.departure;
  const isDepartureChanged = departureStart !== 0 || departureEnd !== 1440;

  const [arrivalStart, arrivalEnd] = selectedRange.arrival;
  const isArrivalChanged = arrivalStart !== 0 || arrivalEnd !== 1440;

  if (isDepartureChanged && isArrivalChanged) {
    return "Departure and arrival times";
  }

  if (isDepartureChanged) {
    return getSliderLabel(
      "Departing",
      selectedRange.departure,
      targetLabelConectors,
    );
  }

  if (isArrivalChanged) {
    return getSliderLabel(
      "Arriving",
      selectedRange.arrival,
      targetLabelConectors,
    );
  }

  return "Any time";
}

const sliderMarks = [0, 360, 720, 1080, 1440].reduce(
  (marks, minutes) => ({
    ...marks,
    [minutes.toString()]: transformMinutesToTimeString(minutes),
  }),
  {},
);

function getSliderLabel(
  prefix: string,
  range: Range,
  connectors = {
    before: ": Before ",
    after: ": After ",
    between: ": ",
  },
) {
  const [start, end] = range;

  if (start === 0 && end === 1440) return `${prefix}: Any time`;
  if (start === 0)
    return `${prefix}${connectors.before}${transformMinutesToTimeString(end)}`;
  if (end === 1440)
    return `${prefix}${connectors.after}${transformMinutesToTimeString(start)}`;

  return `${prefix}${connectors.between}${transformMinutesToTimeString(start)} - ${transformMinutesToTimeString(end)}`;
}

function transformMinutesToTimeString(minutes: number) {
  if (minutes === 1440) return "23:59";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursString = hours.toString().padStart(2, "0");
  const minsString = mins.toString().padStart(2, "0");

  return `${hoursString}:${minsString}`;
}

interface TimeRangeSelectorProps {
  selected: Filters["times"];
  onChange: (stopFilter: Filters["times"]) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <FilterControl target={getTargetLabel(selected)} targetWidth="220px">
      {() => (
        <div className="padding-8 v-space v-space--24">
          <div className="v-space  ">
            <p className="font-size-14">
              {getSliderLabel("Departure time", selected.departure)}
            </p>
            <div className="padding-12">
              <Slider
                className="time-range-slider"
                range
                min={0}
                max={1440}
                step={30}
                allowCross={false}
                value={selected.departure}
                onChange={(value) =>
                  onChange({ ...selected, departure: value as Range })
                }
                marks={sliderMarks}
              />
            </div>
          </div>
          <div className="v-space v-space--8">
            <p className="font-size-14">
              {getSliderLabel("Arrival time", selected.arrival)}
            </p>
            <div className="padding-12">
              <Slider
                className="time-range-slider"
                range
                min={0}
                max={1440}
                step={30}
                allowCross={false}
                value={selected.arrival}
                onChange={(value) =>
                  onChange({ ...selected, arrival: value as Range })
                }
                marks={sliderMarks}
              />
            </div>
          </div>
        </div>
      )}
    </FilterControl>
  );
};
