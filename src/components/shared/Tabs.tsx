import classNames from "classnames";
import React from "react";

export interface TabsProps {
  /**
   * The currently selected tab option
   */
  value: string;

  /**
   * Callback for when a new tab option is selected
   */
  onChange: (value: string) => void;

  /**
   * The options you want to render on the tabs
   */
  options: string[];
}

export const Tabs: React.FC<TabsProps> = ({ value, onChange, options }) => (
  <div className="seat-map__tab-select">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className={classNames("seat-map__tab-select-option", {
          "seat-map__tab-select-option--selected": option === value,
        })}
        onClick={() => value !== option && onChange(option)}
      >
        {option}
      </button>
    ))}
  </div>
);
