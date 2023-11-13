import { OfferSlice } from "src/types";
import OfferSliceCondition from "./OfferSliceCondition";
import { getItineraryItems } from "./lib/getItineraryItems";

// TODO(idp): need to make the type for PartialOfferSlice
// and make it clear what's the distinction between them
type PartialOfferSlice = OfferSlice;

interface DuffelOfferSliceProps {
  /**
   * The slice you'd like to display
   */
  slice: OfferSlice | PartialOfferSlice;

  /**
   * Set this value to true to disable the click interaction
   */
  isAlwaysExtendedView: boolean;
}

export const DuffelOfferSlice: React.FC<DuffelOfferSliceProps> = ({
  slice,
  isAlwaysExtendedView,
}) => {
  return (
    <div className="slice-summary" data-selector="fs-show">
      <OfferSliceSummary
        slice={slice}
        showFullDate={showFullDate}
        showFlightNumbers={!isExpanded}
        hideFareBrand={hideFareBrand}
      />

      {/* TODO(idp): 
    don't have vspace in this code base yet. how do we want to handle this?
    maybe we can introduce a small set of utility classes for spacing?
    */}
      <VSpace space={32}>
        {sliceDetails.map((item, index) => (
          <TravelItineraryItem item={item} key={index} />
        ))}
      </VSpace>

      {isExpanded &&
        !hideConditions &&
        slice.conditions?.changeBeforeDeparture?.allowed && (
          <div className="slice-summary__condition">
            <OfferSliceCondition
              type="changeBeforeDeparture"
              condition={slice.conditions.changeBeforeDeparture}
            />
          </div>
        )}

      {/* TODO(idp): remove JSX */}
      <style jsx>{`
        .slice-summary__condition {
          margin-top: 24px;
          margin-left: 64px;
          max-width: 500px;
        }
      `}</style>
    </div>
  );
};
