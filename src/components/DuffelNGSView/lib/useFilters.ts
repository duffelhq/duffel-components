import { useState } from "react";
import { Filters, filterResults } from "./filter-results";
import { OfferRequest } from "@duffel/api/types";
import { getInitialFilterValues } from "./get-initial-filter-values";

export function useFilters(
  offerRequest: OfferRequest,
  selectedSliceKeys: string[],
) {
  const initialFilterValues = getInitialFilterValues(offerRequest);

  const [airlinesFilter, setAirlinesFilter] = useState<Filters["airlines"]>(
    initialFilterValues.airlines,
  );

  const [timesFilter, setTimesFilter] = useState<Filters["times"]>(
    initialFilterValues.times,
  );

  const [stopsFilter, setStopsFilter] = useState<Filters["stops"]>(
    initialFilterValues.stops,
  );

  function clearFilters() {
    setAirlinesFilter(initialFilterValues.airlines);
    setTimesFilter(initialFilterValues.times);
    setStopsFilter(initialFilterValues.stops);
  }

  const filteredOffers = filterResults(
    offerRequest.offers,
    selectedSliceKeys.length > 0 ? selectedSliceKeys.length : 0,
    {
      airlines: airlinesFilter,
      times: timesFilter,
      stops: stopsFilter,
    },
  );

  return {
    airlinesFilterOptions: initialFilterValues.airlines,
    airlinesFilter,
    timesFilter,
    stopsFilter,
    setAirlinesFilter,
    setTimesFilter,
    setStopsFilter,
    clearFilters,
    filteredOffers,
  };
}
