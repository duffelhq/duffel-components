import { Icon } from "@components/shared/Icon";
import { getDateString } from "@lib/getDateString";
import { getTimeString } from "@lib/getTimeString";
import classNames from "classnames";
import {
  SliceDetailItemChangeStatus,
  TravelDetails,
} from "src/types/TravelDetails";
import { getHighlightStyles } from "./lib/getHighlightStyles";
import { VSpace } from "@components/shared/VSpace";
import { HSpace } from "@components/shared/HSpace";

export interface SliceDetailsTravelItemProps {
  changeStatus?: SliceDetailItemChangeStatus;
  travelDetails: TravelDetails<"offer" | "order">;
  highlightAll?: boolean;
  keysToHighlight?: string[];
}

export const getTerminalString = (terminal?: string | null) => {
  if (!terminal) return "";
  return terminal.toLowerCase().includes("terminal")
    ? `, ${terminal}`
    : `, Terminal ${terminal}`;
};

export const OfferSliceDetailTravelItem: React.FC<
  SliceDetailsTravelItemProps
> = ({
  changeStatus,
  travelDetails,
  highlightAll = false,
  keysToHighlight,
}) => {
  const origin = travelDetails.origin;
  const destination = travelDetails?.destination;

  const circleClasses = classNames(
    "circle",
    changeStatus && `circle--${changeStatus}`,
  );

  const itineraryClasses = classNames(
    "itinerary-top",
    changeStatus && `itinerary-top--${changeStatus}`,
  );

  const highlightStyles = (key?: string) => {
    return getHighlightStyles(highlightAll, key, keysToHighlight);
  };

  return (
    <div>
      <div className="itinerary-container">
        <VSpace space={16}>
          <div className={itineraryClasses}>
            <div className="itinerary-node-container">
              <div className={circleClasses}></div>
              <div className="itinerary-node-text">
                <span {...highlightStyles("departingAtDate")}>
                  <span>
                    {getDateString(travelDetails.departingAt, "long")}
                  </span>
                  {", "}
                  <span {...highlightStyles("departingAtTime")}>
                    {getTimeString(travelDetails.departingAt)}
                  </span>
                </span>
                <span {...highlightStyles()}>
                  Depart from {origin.name}&nbsp;({origin.iata_code})
                  {getTerminalString(travelDetails.originTerminal)}
                </span>
              </div>
            </div>
          </div>

          {travelDetails.flightDuration ? (
            <div className="itinerary-duration">
              <div {...highlightStyles()}>
                Flight duration:{" "}
                <span {...highlightStyles("flightDuration")}>
                  {travelDetails.flightDuration}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}

          <div className="itinerary-bottom">
            <div className="itinerary-node-container">
              <div className={circleClasses} />
              <div className="itinerary-node-text">
                <span {...highlightStyles("arrivingAtDate")}>
                  <span>{getDateString(travelDetails.arrivingAt, "long")}</span>
                  {", "}
                  <span {...highlightStyles("arrivingAtTime")}>
                    {getTimeString(travelDetails.arrivingAt)}
                  </span>
                </span>
                <span {...highlightStyles()}>
                  Arrive at {destination.name}&nbsp;({destination.iata_code})
                  {getTerminalString(travelDetails.destinationTerminal)}
                </span>
              </div>
            </div>
          </div>
        </VSpace>
      </div>
      <div className="travel-item-detail">
        {travelDetails.cabinClass && (
          <div {...highlightStyles("cabinClass")}>
            {travelDetails.cabinClass}
          </div>
        )}
        {(travelDetails.operatedBy || travelDetails.airline.name) && (
          <div {...highlightStyles("operatedBy")}>
            {!travelDetails.operatedBy ||
            travelDetails.airline.name === travelDetails.operatedBy
              ? travelDetails.airline.name
              : `Operated by ${travelDetails.operatedBy}`}
          </div>
        )}
        {travelDetails.aircraft && (
          <div {...highlightStyles("aircraft")}>{travelDetails.aircraft}</div>
        )}
        {travelDetails.flight && (
          <div {...highlightStyles("flight")}>{travelDetails.flight}</div>
        )}
        {travelDetails.baggagesIncluded?.carryOn &&
        travelDetails.baggagesIncluded.carryOn > 0 ? (
          <HSpace space={4} {...highlightStyles("carryOn")}>
            <Icon name="cabin_bag" size={14} />
            <div>
              {travelDetails.baggagesIncluded.carryOn} carry-on bag
              {travelDetails.baggagesIncluded.carryOn > 1 && "s"}
            </div>
          </HSpace>
        ) : null}
        {travelDetails.baggagesIncluded?.checked &&
        travelDetails.baggagesIncluded.checked > 0 ? (
          <HSpace space={4} {...highlightStyles("checked")}>
            <Icon name="checked_bag" size={14} />
            <div>
              {travelDetails.baggagesIncluded.checked} checked bag
              {travelDetails.baggagesIncluded.checked > 1 && "s"}
            </div>
          </HSpace>
        ) : null}
      </div>
    </div>
  );
};
