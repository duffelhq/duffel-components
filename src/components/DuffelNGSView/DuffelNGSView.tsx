import { Icon } from "@components/shared/Icon";
import { NonIdealState } from "@components/shared/NonIdealState";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";
import { OfferRequest } from "@duffel/api/types";
import { getDateString } from "@lib/getDateString";
import classNames from "classnames";
import * as React from "react";
import { FilterControls } from "./FilterControls";
import { NGSTable } from "./NGSTable";
import { NGSOfferRow } from "./lib/group-offers-for-ngs-view";
import { sortNGSRowsByDuration } from "./lib/sort-ngs-rows-by-duration";
import {
  SortDirection,
  sortNGSRowsByShelfPrice,
} from "./lib/sort-ngs-rows-by-shelf-price";
import { useFilters } from "./lib/useFilters";
import { SortOption, SortingControl } from "./SortingControl";
import { NGSShelf } from "./lib";

function getSortShelfAndDirection(
  sortOption: SortOption,
): [NGSShelf, "asc" | "desc"] {
  const [shelf, direction] = sortOption.split("-");
  return [parseInt(shelf), direction as SortDirection];
}

function getDurationSortDirection(sortOption: SortOption) {
  return sortOption.split("-")[1] as SortDirection;
}

export function useSort() {
  const [sortOption, setSortOption] =
    React.useState<SortOption>("duration-asc");

  function sortingFunction(rows: NGSOfferRow[]) {
    if (sortOption.startsWith("duration")) {
      const direction = getDurationSortDirection(sortOption);
      return sortNGSRowsByDuration(rows, direction);
    } else {
      const [shelf, direction] = getSortShelfAndDirection(sortOption);
      return sortNGSRowsByShelfPrice(rows, shelf, direction);
    }
  }

  return {
    sortOption,
    setSortOption,
    sortingFunction,
  };
}

/*

setSortDuration(null);
if (shelf === sortShelf) {
  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
} else if (selectedColumn === shelf) {
  setSortShelf(shelf);
}

setSortShelf(null);


*/

export interface DuffelNGSViewProps {
  offerRequest: OfferRequest;
  onSelect: (offerId: string) => void;
}

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offerRequest,
  onSelect,
}) => {
  const [selectedSliceKeys, setSelectedSliceKeys] = React.useState<string[]>(
    [],
  );
  const [selectedOwner, setSelectedOwner] = React.useState<string | undefined>(
    undefined,
  );

  const [selectedColumn, setSelectedColumn] = React.useState<NGSShelf | null>(
    null,
  );

  const {
    airlinesFilterOptions,
    airlinesFilter,
    timesFilter,
    stopsFilter,
    setAirlinesFilter,
    setTimesFilter,
    setStopsFilter,
    clearFilters,
    filteredOffers,
  } = useFilters(offerRequest, selectedSliceKeys);

  const { sortOption, setSortOption, sortingFunction } = useSort();

  const numSlices = offerRequest.slices.length;
  const currentSlice =
    selectedSliceKeys.length > 0
      ? offerRequest.slices[selectedSliceKeys.length]
      : offerRequest.slices[0];

  if (offerRequest.offers.length == 0) {
    return null;
  }

  return (
    <div className="duffel-ngs-view">
      <WithComponentStyles>
        {currentSlice && (
          <div className="h-space h-space--4 hspace--space-between">
            <div>
              <div className="duffel-ngs-view_breadcrumbs">
                {offerRequest.slices.map((slice, index) => (
                  <>
                    <button
                      key={index}
                      className={classNames(
                        "duffel-ngs-view_breadcrumb",
                        index < selectedSliceKeys.length &&
                          "duffel-ngs-view_breadcrumb--clickable",
                        index === selectedSliceKeys.length &&
                          "duffel-ngs-view_breadcrumb--selected",
                      )}
                      onClick={() => {
                        if (index < selectedSliceKeys.length) {
                          const newSliceKeys = selectedSliceKeys.slice(
                            0,
                            index - 1,
                          );
                          setSelectedSliceKeys(newSliceKeys);
                          if (newSliceKeys.length === 0) {
                            setSelectedOwner(undefined);
                          }

                          clearFilters();
                        }
                      }}
                    >
                      {slice.origin.iata_code} - {slice.destination.iata_code}
                    </button>
                    {index < numSlices - 1 && (
                      <Icon name="arrow_right" size={12} color="--GREY-500" />
                    )}
                  </>
                ))}
              </div>
              <h3 className="duffel-ngs-view_heading">
                {numSlices === 2 &&
                  `${selectedSliceKeys.length === 0 ? "Outbound" : "Inbound"} flight to  ${currentSlice.destination.name}`}
                {numSlices !== 2 &&
                  `Flight to ${currentSlice.destination.name}`}
              </h3>
              <h4 className="duffel-ngs-view_subheading">
                {getDateString(currentSlice.departure_date, "long")}
              </h4>
            </div>
            <div className="h-space h-space--8">
              <FilterControls
                {...{
                  selectedOwner,
                  airlines: airlinesFilterOptions,
                  airlinesFilter,
                  setAirlinesFilter,
                  timesFilter,
                  setTimesFilter,
                  stopsFilter,
                  setStopsFilter,
                }}
              />
              <SortingControl
                selected={sortOption}
                onChange={(sortingOption) => {
                  setSortOption(sortingOption);
                  if (!sortingOption.startsWith("duration")) {
                    const shelf = parseInt(sortingOption.split("-")[0]);
                    setSelectedColumn(shelf);
                  }
                }}
              />
            </div>
          </div>
        )}
        {filteredOffers.length === 0 && (
          <NonIdealState>
            There are no offers matching your filters. <br />
          </NonIdealState>
        )}

        {filteredOffers.length > 0 && (
          <NGSTable
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            offers={filteredOffers}
            sliceIndex={selectedSliceKeys.length}
            previousSliceKeys={selectedSliceKeys}
            onSelect={(offerId, sliceKey, offer) => {
              window.scrollTo(0, 0);
              if (selectedSliceKeys.length == numSlices - 1) {
                onSelect(offerId);
              } else {
                setSelectedOwner(offer.owner ? offer.owner.name : undefined);
                setSelectedSliceKeys([...selectedSliceKeys, sliceKey]);
                clearFilters();
              }
            }}
            sortingFunction={sortingFunction}
          />
        )}
      </WithComponentStyles>
    </div>
  );
};
