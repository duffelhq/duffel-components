import { AirlineLogo } from "@components/shared/AirlineLogo";
import React from "react";
import { FilterControl, FilterControlOption } from "./FilterControl";
import { Filters } from "./lib/filter-results";

type FilterAirline = Filters["airlines"][number];

function isOptionSelected(
  airline: FilterAirline,
  selectedAirlines: Filters["airlines"],
) {
  return selectedAirlines.some(
    (selectedAirline) => selectedAirline.iata_code === airline.iata_code,
  );
}

function getSelectLabel(
  selected: Filters["airlines"],
  options: Filters["airlines"],
) {
  if (selected.length === options.length) return "All airlines";
  if (selected.length >= 2 || selected.length <= 5)
    return `Airlines: ${selected.map(({ iata_code }) => iata_code).join(", ")}`;

  return `${selected.length} airlines`;
}

export interface AirlineSelectorProps {
  options: Filters["airlines"];
  selected: Filters["airlines"];
  onChange: (airlines: Filters["airlines"]) => void;
  disabled?: boolean;
  targetLabel?: string;
}

function removeFromSelected(
  option: FilterAirline,
  selectedAirlines: Filters["airlines"],
) {
  if (selectedAirlines.length === 1) return selectedAirlines;
  return selectedAirlines.filter(
    (selected) => selected.iata_code != option.iata_code,
  );
}

function addToSelected(
  option: FilterAirline,
  selectedAirlines: Filters["airlines"],
) {
  return [option, ...selectedAirlines];
}

export const AirlineSelector: React.FC<AirlineSelectorProps> = ({
  options,
  selected,
  onChange,
  disabled,
  targetLabel,
}) => {
  return (
    <FilterControl
      disabled={disabled}
      target={targetLabel || getSelectLabel(selected, options)}
    >
      {(onClose) =>
        options.map((option, index) => {
          const isSelected = isOptionSelected(option, selected);
          return (
            <Option
              key={option.iata_code}
              {...option}
              isSelected={isSelected}
              onClick={() => {
                const newState = isSelected
                  ? removeFromSelected(option, selected)
                  : addToSelected(option, selected);

                onChange(newState);
              }}
              onDoubleClick={() => {
                onChange([option]);
              }}
              onKeyDown={(e) => {
                console.log(e.key);
                if (
                  e.key === "Escape" ||
                  (e.key === "Tab" && index === options.length - 1)
                ) {
                  onClose();
                }
              }}
            />
          );
        })
      }
    </FilterControl>
  );
};

type OptionProps = FilterAirline & {
  isSelected: boolean;
  onClick: (option: FilterAirline) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onDoubleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Option: React.FC<OptionProps> = ({
  name,
  iata_code,
  isSelected,
  onClick,
  onKeyDown,
  onDoubleClick,
}) => (
  <FilterControlOption
    isSelected={isSelected}
    className="airline-selector__option"
    onClick={() => onClick({ name, iata_code })}
    onKeyDown={onKeyDown}
    onDoubleClick={onDoubleClick}
  >
    <AirlineLogo name={name} iataCode={iata_code} size={16} />
    <span>{name}</span>
  </FilterControlOption>
);
