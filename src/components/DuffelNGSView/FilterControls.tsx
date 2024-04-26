import { AirlineSelector } from "./AirlineSelector";
import { StopsSelector } from "./StopsSelector";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { Filters } from "./lib/filter-results";

interface FilterControlsProps {
  airlines: Filters["airlines"];
  airlinesFilter: Filters["airlines"];
  setAirlinesFilter: (airlines: Filters["airlines"]) => void;
  timesFilter: Filters["times"];
  setTimesFilter: (times: Filters["times"]) => void;
  stopsFilter: Filters["stops"];
  setStopsFilter: (stops: Filters["stops"]) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  airlines,
  airlinesFilter,
  setAirlinesFilter,
  timesFilter,
  setTimesFilter,
  stopsFilter,
  setStopsFilter,
}) => {
  return (
    <div className="h-space h-space--8">
      <AirlineSelector
        options={airlines}
        selected={airlinesFilter}
        onChange={setAirlinesFilter}
      />
      <StopsSelector selected={stopsFilter} onChange={setStopsFilter} />
      <TimeRangeSelector selected={timesFilter} onChange={setTimesFilter} />
    </div>
  );
};
