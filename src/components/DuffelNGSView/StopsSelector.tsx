import React from "react";
import { FilterControl, FilterControlOption } from "./FilterControl";
import { Filters } from "./lib/filter-results";

const OPTIONS: Array<Filters["stops"]> = [
  "direct-only",
  "1-stop-at-most",
  "2-stops-at-most",
  "any",
];

function getLabel(stopsOption: Filters["stops"]) {
  if (stopsOption === "direct-only") {
    return "Direct only";
  }
  if (stopsOption === "1-stop-at-most") {
    return "1 stop at most";
  }
  if (stopsOption === "2-stops-at-most") {
    return "2 stops at most";
  }
  if (stopsOption === "any") {
    return "Any number of stops";
  }
}

interface StopsSelectorProps {
  selected: Filters["stops"];
  onChange: (stopFilter: Filters["stops"]) => void;
}

export const StopsSelector: React.FC<StopsSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <FilterControl target={getLabel(selected)} targetWidth="178px">
      {(onClose) =>
        OPTIONS.map((option, index) => (
          <FilterControlOption
            isSelected={option === selected}
            key={option}
            onClick={() => onChange(option)}
            onKeyDown={(e) => {
              if (
                e.key === "Escape" ||
                (e.key === "Tab" && index === OPTIONS.length - 1)
              ) {
                onClose();
              }
            }}
          >
            <span>{getLabel(option)}</span>
          </FilterControlOption>
        ))
      }
    </FilterControl>
  );
};
