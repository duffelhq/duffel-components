import * as React from "react";
import { OfferSliceWithNGS, OfferWithNGS } from "./lib";
import { NGSTable } from "./NGSTable";
import { getDateString } from "@lib/getDateString";
import { Icon } from "@components/shared/Icon";
import classNames from "classnames";

export interface DuffelNGSViewProps {
  offers: OfferWithNGS[];
  onSelect: (offerId: string) => void;
}

export const DuffelNGSView: React.FC<DuffelNGSViewProps> = ({
  offers,
  onSelect,
}) => {
  const [selectedSliceKeys, setSelectedSliceKeys] = React.useState<string[]>(
    []
  );
  const [currentSlice, setCurrentSlice] =
    React.useState<OfferSliceWithNGS | null>(null);

  React.useEffect(() => {
    const slice =
      selectedSliceKeys.length > 0
        ? offers[0].slices[selectedSliceKeys.length]
        : offers[0].slices[0];
    setCurrentSlice(slice);
  }, [selectedSliceKeys]);

  if (offers.length == 0) {
    return null;
  }

  const numSlices = offers[0].slices.length;

  return (
    <div className="duffel-components duffel-ngs-view">
      {currentSlice && (
        <>
          <div className="duffel-ngs-view_breadcrumbs">
            {offers[0].slices.map((slice, index) => (
              <>
                <button
                  key={index}
                  className={classNames(
                    "duffel-ngs-view_breadcrumb",
                    index < selectedSliceKeys.length &&
                      "duffel-ngs-view_breadcrumb--clickable",
                    index === selectedSliceKeys.length &&
                      "duffel-ngs-view_breadcrumb--selected"
                  )}
                  onClick={() => {
                    if (index < selectedSliceKeys.length) {
                      setSelectedSliceKeys(
                        selectedSliceKeys.slice(0, index - 1)
                      );
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
              `${selectedSliceKeys.length === 0 ? "Outbound" : "Inbound"} flight to  ${currentSlice.destination.city_name}`}
            {numSlices !== 2 &&
              `Flight to ${currentSlice.destination.city_name}`}
          </h3>
          <h4 className="duffel-ngs-view_subheading">
            {getDateString(currentSlice.segments[0].departing_at, "long")}
          </h4>
        </>
      )}
      <NGSTable
        offers={offers}
        sliceIndex={selectedSliceKeys.length}
        previousSliceKeys={selectedSliceKeys}
        onSelect={(offerId, sliceKey) => {
          if (selectedSliceKeys.length == numSlices - 1) {
            onSelect(offerId);
          } else {
            setSelectedSliceKeys([...selectedSliceKeys, sliceKey]);
          }
        }}
      />
    </div>
  );
};
