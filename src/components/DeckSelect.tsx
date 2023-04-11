import { Tabs } from "@components/Tabs";
import * as React from "react";

export interface DeckSelectProps {
  /**
   * The currently selected deck number
   */
  value: number;
  /**
   * What to do when the user selects a deck
   */
  setValue: (value: number) => void;
}

/**
 * The deck selection component for the seat map.
 */
export const DeckSelect: React.FC<DeckSelectProps> = ({ value, setValue }) => {
  const options = ["Lower deck", "Upper deck"];
  return (
    <Tabs
      options={options}
      value={options[value]}
      onChange={(item) => setValue(options.indexOf(item))}
    />
  );
};
