import * as React from "react";
import { usePassengersContext } from "@lib/usePassengersContext";
import { Summary } from "./Summary";
import { useViewportWidth } from "@lib/useViewPortWidth";
import { PassengerSelection } from "./PassengerSelect";

const isMobileOrTablet = (viewport: number) => {
  return viewport < 768;
};

export interface PassengersLayoutProps {
  renderPassengerSelectionDetails: (
    passengerId: string,
    segmentId: string
  ) => React.ReactNode;
  mobileOnlyContent?: React.ReactNode | null;
  summaryTitle: string;
  formattedTotalAmount: string;
  onSubmit: () => void;
}

const getNextButtonText = (
  width: number,
  hasNextPassenger: boolean,
  isLastPassengerInSegment: boolean
) => {
  if (!hasNextPassenger) {
    return "Continue";
  }

  if (isMobileOrTablet(width)) {
    return "Next";
  }

  return isLastPassengerInSegment ? "Next flight" : "Next passenger";
};

export const PassengersLayout: React.FC<
  React.PropsWithChildren<PassengersLayoutProps>
> = ({
  summaryTitle,
  formattedTotalAmount,
  renderPassengerSelectionDetails,
  mobileOnlyContent,
  onSubmit,
  children,
}) => {
  const width = useViewportWidth();
  const passengersContext = usePassengersContext();
  if (!passengersContext) {
    throw new Error(
      "PassengerSelection can only be used within PassengersProvider"
    );
  }

  const {
    dispatch,
    hasPreviousPassenger,
    hasNextPassenger,
    isLastPassengerInSegment,
  } = passengersContext;

  return (
    <div>
      <section className="layout">
        <div className="layout__container">
          {!isMobileOrTablet(width) && (
            <aside className="layout__aside">
              <PassengerSelection
                renderPassengerSelectionDetails={
                  renderPassengerSelectionDetails
                }
              />
            </aside>
          )}
          <div className="layout__main-content">{children}</div>
        </div>
        {mobileOnlyContent && isMobileOrTablet(width)
          ? mobileOnlyContent
          : null}
        <div className="layout__confirmation">
          <Summary
            title={summaryTitle}
            formattedAmount={formattedTotalAmount}
            onClick={() => {
              if (!hasNextPassenger) {
                onSubmit();
                return;
              }
              dispatch({ type: "selectNextPassenger" });
            }}
            onBackClick={() => dispatch({ type: "selectPreviousPassenger" })}
            disableBackButton={hasPreviousPassenger}
            iconAfter={hasNextPassenger ? "arrow_right" : undefined}
            primaryButtonCopy={getNextButtonText(
              width,
              hasNextPassenger,
              isLastPassengerInSegment
            )}
          />
        </div>
      </section>
    </div>
  );
};
