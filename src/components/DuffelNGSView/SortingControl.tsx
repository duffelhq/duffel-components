import React from "react";
import { FilterControl, FilterControlOption } from "./FilterControl";

const OPTIONS = {
  "duration-asc": "Duration (shortest to longest)",
  "duration-desc": "Duration (longest to shortest)",

  "1-asc": "Price on Basic shelf (low to high)",
  "1-desc": "Price on Basic shelf (high to low)",

  "2-asc": "Price on Standard shelf (low to high)",
  "2-desc": "Price on Standard shelf (high to low)",

  "3-asc": "Price on Plus shelf (low to high)",
  "3-desc": "Price on Plus shelf (high to low)",

  "4-asc": "Price on Premium shelf (low to high)",
  "4-desc": "Price on Premium shelf (high to low)",

  "5-asc": "Price on Luxury shelf (low to high)",
  "5-desc": "Price on Luxury shelf (high to low)",
} as const;

export type SortOption = keyof typeof OPTIONS;

const OPTION_KEYS = Object.keys(OPTIONS) as SortOption[];

function getLabel(stopsOption: SortOption) {
  return OPTIONS[stopsOption];
}

interface StopsSelectorProps {
  selected: SortOption;
  onChange: (stopFilter: SortOption) => void;
}

export const SortingControl: React.FC<StopsSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <FilterControl
      target={`Sort by: ${getLabel(selected)}`}
      popoverWidth={"330px"}
    >
      {(onClose) =>
        OPTION_KEYS.map((option, index) => (
          <FilterControlOption
            isSelected={option === selected}
            key={option}
            onClick={() => {
              onChange(option);
              onClose();
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Escape" ||
                (e.key === "Tab" && index === OPTION_KEYS.length - 1)
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
