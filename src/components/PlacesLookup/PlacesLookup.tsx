import Fuse from "fuse.js";
import { debounce } from "lodash";
import React from "react";
import { Icon } from "../shared/Icon";

const DATA_SOURCE = "https://assets.duffel.com/data/iata-lookup-v2.json";

interface City {
  type: "city";
  name: string;
  iata_code: string;
}
interface Airport {
  type: "airport";
  name: string;
  iata_code: string;
  latitude: string;
  longitude: string;
}
type Place = City | Airport;

const mapDataRowsIntoObjects = (data: string[]): Place[] =>
  data.map((row) => {
    const [type, name, iata_code, latitude, longitude] = row.split(",");
    if (type === "C") return { type: "city", name, iata_code } as City;
    else
      return {
        type: "airport",
        name,
        iata_code,
        latitude,
        longitude,
      } as Airport;
  });

export interface PlacesLookupProps {
  onPlaceSelected: (selection: Place) => void;
  placeholder?: string;
}

export const PlacesLookup: React.FC<PlacesLookupProps> = ({
  onPlaceSelected,
  placeholder = "Lookup city or airport",
}) => {
  const [shouldShowPopover, setShouldShowPopover] =
    React.useState<boolean>(true);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [lookupData, setLookupData] = React.useState<Fuse<Place>>(new Fuse([]));
  const [lookupResults, setLookupResults] = React.useState<
    Fuse.FuseResult<Place>[]
  >([]);

  const runLookup = debounce((newInputValue: string) => {
    setLookupResults(
      lookupData.search(newInputValue, {
        limit: 10,
      })
    );
  }, 300);

  React.useEffect(() => {
    fetch(DATA_SOURCE)
      .then((response: Response) => response.json())
      .then((data: string[]) =>
        setLookupData(
          new Fuse<Place>(mapDataRowsIntoObjects(data), {
            threshold: 0.2,
            keys: ["name", "iata_code"],
          })
        )
      );
  }, []);

  return (
    <div className="places-lookup">
      <input
        className="places-lookup-input"
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
            {lookupResults.map(({ item }, index) => (
              <button
                type="button"
                className="places-lookup-popover__item"
                key={item.iata_code + index}
                onClick={() => {
                  setShouldShowPopover(false);
                  onPlaceSelected(item);
                  setInputValue(item.name);
                }}
              >
                <span className="places-lookup-popover__icon-and-name-container">
                  <Icon
                    style={{ fill: "var(--GREY-400)", marginTop: "-2px" }}
                    name={
                      item.type === "airport" ? "flight_takeoff" : "apartment"
                    }
                  />
                  {item.name}
                </span>{" "}
                <span style={{ color: "var(--GREY-600)", fontSize: "12px" }}>
                  {item.iata_code}
                </span>
              </button>
            ))}
          </div>
        )}
    </div>
  );
};
