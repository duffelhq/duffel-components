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
  popupClassName?: string;
  highlightedPopupItemClassName?: string;
  inputValue?: string;
}

export const MapboxPlacesLookup: React.FC<MapboxPlacesLookupProps> = ({
  mapboxPublicKey,
  onPlaceSelected,
  placeholder = "Look up city or airport",
  inputClassName,
  popupClassName,
  highlightedPopupItemClassName,
  inputValue: inputValueProp = "",
}) => {
  const [shouldShowPopover, setShouldShowPopover] =
    React.useState<boolean>(true);
  const [inputValue, setInputValue] = React.useState<string>(inputValueProp);
  const [lookupResults, setLookupResults] = React.useState<Place[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);

  const getPlacesFromMapbox = getPlacesFromMapboxClient(mapboxPublicKey);

  const runLookup = debounce(async (newInputValue: string) => {
    setLookupResults(await getPlacesFromMapbox(newInputValue));
    if (highlightedIndex != 0) {
      setHighlightedIndex(0);
    }
  }, 300);

  function confirmHighlightedIndex() {
    onPlaceSelected(lookupResults[highlightedIndex]);
    setInputValue(lookupResults[highlightedIndex].name);
    setHighlightedIndex(0);
    setShouldShowPopover(false);
  }

  function closePopover() {
    setHighlightedIndex(0);
    setShouldShowPopover(false);
  }

  function decrementHighlightedIndex() {
    let nextIndex = highlightedIndex - 1;
    if (nextIndex < 0) nextIndex = lookupResults.length - 1;
    setHighlightedIndex(nextIndex);
  }

  function incrementHighlightedIndex() {
    let nextIndex = highlightedIndex + 1;
    if (nextIndex > lookupResults.length - 1) nextIndex = 0;
    setHighlightedIndex(nextIndex);
  }

  function handleSpecialKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(event.key);
    if (event.key === "Enter") {
      confirmHighlightedIndex();
      event.preventDefault();
    }
    if (event.key === "Escape") {
      closePopover();
      event.preventDefault();
    }
    if (event.key === "ArrowDown") {
      incrementHighlightedIndex();
      event.preventDefault();
    }
    if (event.key === "ArrowUp") {
      decrementHighlightedIndex();
      event.preventDefault();
    }
  }

  return (
    <div className="places-lookup">
      <input
        className={inputClassName}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onKeyDown={handleSpecialKeyPress}
        onBlur={() => {
          // Timeout is needed to prevent the popover from
          // closing before the click event is registered on a button below
          setTimeout(() => {
            setShouldShowPopover(false);
            setLookupResults([]);
          }, 300);
        }}
        onChange={(e) => {
          if (!shouldShowPopover) setShouldShowPopover(true);
          setInputValue(e.target.value);
          runLookup(e.target.value);
        }}
      />
      {shouldShowPopover &&
        inputValue.length > 0 &&
        lookupResults.length > 0 && (
          <div className={popupClassName}>
            {lookupResults.map((place, index) => (
              <button
                className={classNames(
                  "places-lookup-popover__item",
                  index === highlightedIndex && highlightedPopupItemClassName
                )}
                key={place.shortName + index}
                onClick={() => {
                  setHighlightedIndex(0);
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
