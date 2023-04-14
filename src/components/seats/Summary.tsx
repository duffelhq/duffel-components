import * as React from "react";
import { Segment } from "./Segment";
import { IconName } from "@components/Icon";
import { Button } from "@components/Button";
import { usePassengersContext } from "@lib/usePassengersContext";

export interface SummaryProps {
  title: string;
  formattedAmount: string;
  /**
   * What to do when the user clicks the summary button
   */
  onClick: () => void;
  /**
   * What to do when the user clicks the back button on mobile
   */
  onBackClick: () => void;
  /**
   * Disable back button if first passenger is selected on mobile
   */
  disableBackButton: boolean;
  /**
   * What copy should the summary button render
   * Ex.: "Continue"
   */
  primaryButtonCopy: string;
  /**
   * What copy should the cancel button be
   * Ex.: "Cancel"
   */
  cancelButtonCopy?: string;

  iconAfter?: IconName;
}

/**
 * The passenger layout summary component.
 */
export const Summary: React.FC<SummaryProps> = ({
  title,
  formattedAmount,
  onClick,
  primaryButtonCopy,
  iconAfter,
  onBackClick,
  disableBackButton,
}) => {
  const passengerContext = usePassengersContext();

  const actions = (
    <div className="summary__actions">
      <Button
        text="Previous passenger"
        onClick={onBackClick}
        disabled={disableBackButton}
        intent="MUTED"
        iconOnly="arrow_right"
        aria-label="Previous passenger"
        className="summary__actions--previous"
      />
      <Button
        data-testid={`summary-button-${primaryButtonCopy
          .replace(" ", "-")
          .toLowerCase()}`}
        text={primaryButtonCopy}
        className="summary__confirmation-btn"
        onClick={onClick}
        iconAfter={iconAfter}
      />
    </div>
  );

  const amountOnly = Number(formattedAmount.replace(/[^0-9.-]+/g, ""));

  const summaryDescription =
    amountOnly !== 0 ? `${title} for ${formattedAmount}` : `${title}`;

  return (
    <>
      <div className="summary" data-testid="passengers-layout-summary">
        <div className="summary__description">
          <div className="summary__description-title">{summaryDescription}</div>
        </div>
        {actions}
      </div>

      <div className="summary summary--mobile">
        <div className="summary__segment">
          {passengerContext?.selectedSegment && (
            <Segment
              segment={passengerContext?.selectedSegment}
              key={`summary-${passengerContext?.selectedSegment.id}`}
            />
          )}
          {passengerContext?.selectedPassenger && (
            <h3 className="summary__segment-passenger">
              {passengerContext?.selectedPassenger.name}
            </h3>
          )}
        </div>
        <div className="summary__description-cost">
          Total Price <strong>{formattedAmount}</strong>
        </div>
        {actions}
      </div>
    </>
  );
};
