import * as React from "react";
import { NGSTable } from "./NGSTable";
import { getDateString } from "@lib/getDateString";
import { Icon } from "@components/shared/Icon";
import classNames from "classnames";
import { OfferRequest } from "@duffel/api/types";
import { WithComponentStyles } from "@components/shared/WithComponentStyles";

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
  if (offerRequest.offers.length == 0) {
    return null;
  }

  const numSlices = offerRequest.slices.length;
  const currentSlice =
    selectedSliceKeys.length > 0
      ? offerRequest.slices[selectedSliceKeys.length]
      : offerRequest.slices[0];

  return (
    <div className="duffel-ngs-view">
      <WithComponentStyles>
        {currentSlice && (
          <>
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
                        setSelectedSliceKeys(
                          selectedSliceKeys.slice(0, index - 1),
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
                `${selectedSliceKeys.length === 0 ? "Outbound" : "Inbound"} flight to  ${currentSlice.destination.name}`}
              {numSlices !== 2 && `Flight to ${currentSlice.destination.name}`}
            </h3>
            <h4 className="duffel-ngs-view_subheading">
              {getDateString(currentSlice.departure_date, "long")}
            </h4>
          </>
        )}
        <NGSTable
          offers={offerRequest.offers}
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
      </WithComponentStyles>
    </div>
  );
};
