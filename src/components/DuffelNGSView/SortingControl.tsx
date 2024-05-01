import React from "react";
import { FilterControl, FilterControlOption } from "./FilterControl";

const OPTIONS = {
  "duration-asc": "Duration Shortest to Longest",
  "duration-desc": "Duration Longest to Shortest",

  "1-asc": "Price (Basic) Low to High",
  "1-desc": "Price (Basic) High to Low",

  "2-asc": "Price (Standard) Low to High",
  "2-desc": "Price (Standard) High to Low",

  "3-asc": "Price (Plus) Low to High",
  "3-desc": "Price (Plus) High to Low",

  "4-asc": "Price (Premium) Low to High",
  "4-desc": "Price (Premium) High to Low",

  "5-asc": "Price (Luxury) Low to High",
  "5-desc": "Price (Luxury) High to Low",
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
      popoverWidth={"300px"}
      targetWidth="285px"
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
