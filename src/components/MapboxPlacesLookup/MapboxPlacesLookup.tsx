import { debounce } from "lodash";
import React from "react";
import {
  Place,
  getPlacesFromMapboxClient,
} from "./lib/getPlacesFromMapboxClient";
import classNames from "classnames";

export interface MapboxPlacesLookupProps {
  mapboxPublicKey: string;
  onPlaceSelected: (selection: Place) => void;
  placeholder?: string;
  inputClassName?: string;
}

export const MapboxPlacesLookup: React.FC<MapboxPlacesLookupProps> = ({
  mapboxPublicKey,
  onPlaceSelected,
  placeholder = "Lookup city or airport",
  inputClassName,
}) => {
  const [shouldShowPopover, setShouldShowPopover] =
    React.useState<boolean>(true);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [lookupResults, setLookupResults] = React.useState<Place[]>([]);

  const getPlacesFromMapbox = getPlacesFromMapboxClient(mapboxPublicKey);

  const runLookup = debounce(async (newInputValue: string) => {
    setLookupResults(await getPlacesFromMapbox(newInputValue));
  }, 300);

  return (
    <div className="places-lookup">
      <input
        className={classNames("places-lookup-input", inputClassName)}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={(e) => {
          if (!shouldShowPopover) setShouldShowPopover(true);
          setInputValue(e.target.value);
          runLookup(e.target.value);
        }}
      />
      {shouldShowPopover &&
        inputValue.length > 0 &&
        lookupResults.length > 0 && (
          <div
            className="places-lookup-popover"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {lookupResults.map((place) => (
              <button
                className="places-lookup-popover__item"
                key={place.shortName}
                onClick={() => {
                  setShouldShowPopover(false);
                  onPlaceSelected(place);
                  setInputValue(place.name);
                }}
              >
                <span className="places-lookup-popover__icon-and-name-container">
                  {place.name}
                </span>
              </button>
            ))}
          </div>
        )}
    </div>
  );
};
