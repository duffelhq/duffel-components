import { Icon } from "@components/shared/Icon";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";
import { OfferRequest } from "@duffel/api/types";
import { getDateString } from "@lib/getDateString";
import classNames from "classnames";
import * as React from "react";
import { FilterControls } from "./FilterControls";
import { NGSTable } from "./NGSTable";
import { Filters, filterResults } from "./lib/filter-results";
import { getInitialFilterValues } from "./lib/get-initial-filter-values";
import { NonIdealState } from "@components/shared/NonIdealState";

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

  const initialFilterValues = getInitialFilterValues(offerRequest);

  const [airlinesFilter, setAirlinesFilter] = React.useState<
    Filters["airlines"]
  >(initialFilterValues.airlines);

  const [timesFilter, setTimesFilter] = React.useState<Filters["times"]>(
    initialFilterValues.times,
  );

  const [stopsFilter, setStopsFilter] = React.useState<Filters["stops"]>(
    initialFilterValues.stops,
  );

  if (offerRequest.offers.length == 0) {
    return null;
  }

  function clearFilters() {
    setAirlinesFilter(initialFilterValues.airlines);
    setTimesFilter(initialFilterValues.times);
    setStopsFilter(initialFilterValues.stops);
  }

  const numSlices = offerRequest.slices.length;
  const currentSlice =
    selectedSliceKeys.length > 0
      ? offerRequest.slices[selectedSliceKeys.length]
      : offerRequest.slices[0];

  const filteredOffers = filterResults(
    offerRequest.offers,
    selectedSliceKeys.length > 0 ? selectedSliceKeys.length : 0,
    {
      airlines: airlinesFilter,
      times: timesFilter,
      stops: stopsFilter,
    },
  );

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
            <div>
              <FilterControls
                {...{
                  selectedOwner,
                  airlines: initialFilterValues.airlines,
                  airlinesFilter,
                  setAirlinesFilter,
                  timesFilter,
                  setTimesFilter,
                  stopsFilter,
                  setStopsFilter,
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
          />
        )}
      </WithComponentStyles>
    </div>
  );
};
