import { AirlineLogo } from "@components/shared/AirlineLogo";
import { OfferSlice as OfferSliceType } from "@duffel/api/types";
import { convertDurationToString } from "@lib/convertDurationToString";
import { getAirlinesText } from "@lib/getAirlinesText";
import { getDateString } from "@lib/getDateString";
import { getDayDiff } from "@lib/getDayDiff";
import { getSliceDetails } from "@lib/getSliceDetails";
import { getTimeString } from "@lib/getTimeString";
import { isISO8601Duration } from "@lib/isISO8601Duration";
import { SliceLayoverItem } from "src/types/TravelDetails";
import { OfferSliceDetailItem } from "./OfferSliceDetailItem";
import { VSpace } from "@components/shared/VSpace";

export interface OfferSliceProps {
  slice: OfferSliceType;
  showFullDate?: boolean;
  showFlightNumbers?: boolean;
  hideFareBrand?: boolean;
  highlightAll?: boolean;
}

export const OfferSlice: React.FC<OfferSliceProps> = ({
  slice,
  showFullDate = false,
  showFlightNumbers,
  hideFareBrand = false,
}) => {
  const { segments } = slice;
  const firstSegment = segments[0];
  const sliceDetails = getSliceDetails(slice);
  const lastSegment = segments[segments.length - 1];
  const departingAt = sliceDetails[0].travelDetails?.departingAt;
  const arrivingAt =
    sliceDetails[sliceDetails.length - 1].travelDetails?.arrivingAt;
  // We need to strip out the time as getDayDiff rounds the time difference up, but here we
  // only care whether the day is the same or not
  const dayDiff =
    departingAt && arrivingAt
      ? getDayDiff(arrivingAt.split("T")[0], departingAt.split("T")[0])
      : 0;
  const duration =
    slice.duration &&
    typeof slice.duration === "string" &&
    isISO8601Duration(slice.duration) &&
    arrivingAt &&
    departingAt
      ? convertDurationToString(String(slice.duration))
      : null;

  const numberOfStops = sliceDetails.filter(
    (item) => item.type === "layover"
  ).length;

  const layoverItems = (sliceDetails.filter(
    (item) => item.type === "layover"
    // using type assertion here because typescript cannot infer that item.type of 'layover' is SliceLayoverItem
  ) || []) as SliceLayoverItem[];

  return (
    <VSpace space={16}>
      <div className={"offer-slice"}>
        <div className={"offer-slice__airline-logo-wrapper"}>
          <AirlineLogo
            name={firstSegment.marketing_carrier.name}
            iataCode={firstSegment.marketing_carrier.iata_code}
            size={40}
          />
        </div>
        <div>
          <VSpace space={8} className={"offer-slice__column"}>
            <div>
              {showFullDate && departingAt && (
                <span className={"offer-slice__date-label"}>
                  {getDateString(departingAt, "long")}
                </span>
              )}

              {departingAt && arrivingAt && (
                <span className="u-skeletonable">
                  <span>{getTimeString(departingAt)}</span>
                  {" - "}
                  <span>
                    <span>{getTimeString(arrivingAt)}</span>
                    {dayDiff > 0 && (
                      <sup
                      // className={
                      //   keysToHighlight?.includes("arrivingAt") &&
                      //   !keysToHighlight?.includes("dayDiff")
                      //     ? "offer-slice__sup--pa"]
                      //     : undefined
                      // }
                      >
                        +{dayDiff}
                      </sup>
                    )}
                  </span>
                </span>
              )}
            </div>
            <div>
              <span className="u-skeletonable u-skeletonable--small">
                {getAirlinesText(slice, showFlightNumbers, !hideFareBrand)}
              </span>
            </div>
          </VSpace>
          <VSpace space={8} className={"offer-slice__column"}>
            {duration && (
              <div>
                <span className="u-skeletonable">{duration}</span>
              </div>
            )}
            <div>
              <span className="u-skeletonable u-skeletonable--small">
                {firstSegment.origin.iata_code} -{" "}
                {lastSegment.destination.iata_code}
              </span>
            </div>
          </VSpace>
          <VSpace space={8} className={"offer-slice__column"}>
            <div>
              <span className="u-skeletonable">
                {numberOfStops === 0
                  ? "Non-stop"
                  : `${numberOfStops} stop${numberOfStops > 1 ? "s" : ""}`}
              </span>
            </div>
            <div>
              <div />
              {layoverItems.map(({ layoverDetails }, index) => (
                <div className="u-skeletonable" key={index}>
                  {layoverDetails.duration} {layoverDetails.airport.iata_code}
                </div>
              ))}
            </div>
          </VSpace>
        </div>
      </div>
      <div>
        {sliceDetails.map((item, index) => (
          <OfferSliceDetailItem item={item} key={index} />
        ))}
      </div>
    </VSpace>
  );
};
