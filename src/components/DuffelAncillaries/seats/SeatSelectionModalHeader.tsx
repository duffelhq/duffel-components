import { OfferSliceSegment } from "@duffel/api/types";
import { formatDateString } from "@lib/formatDate";
import React from "react";

export interface SeatSelectionModalHeaderProps {
  segmentAndPassengerPermutationsCount: number;
  currentSegment: OfferSliceSegment;
  currentPassengerName: string;

  currentSegmentAndPassengerPermutationsIndex: number;
  setCurrentSegmentAndPassengerPermutationsIndex: (index: number) => void;
}

export const SeatSelectionModalHeader: React.FC<
  SeatSelectionModalHeaderProps
> = ({
  segmentAndPassengerPermutationsCount,
  currentSegmentAndPassengerPermutationsIndex,
  currentSegment,
  currentPassengerName,
  setCurrentSegmentAndPassengerPermutationsIndex,
}) => (
  <div style={{ padding: "24px 24px 16px" }}>
    {segmentAndPassengerPermutationsCount > 1 && (
      <div style={{ display: "flex", columnGap: "4px" }}>
        {Array(segmentAndPassengerPermutationsCount)
          .fill(0)
          .map((_, index) =>
            index === currentSegmentAndPassengerPermutationsIndex ? (
              <ActiveSegment key={`segment_${index}`} />
            ) : (
              <InactiveSegment
                key={`segment_${index}`}
                onClick={() =>
                  setCurrentSegmentAndPassengerPermutationsIndex(index)
                }
              />
            )
          )}
      </div>
    )}
    <h2
      className="h3--semibold"
      style={
        segmentAndPassengerPermutationsCount > 1
          ? { marginBlock: "12px 0px" }
          : {}
      }
    >
      Flight to {currentSegment.destination.iata_code}
      <span
        className="p2--regular"
        style={{
          color: "var(--GREY-600)",
          marginLeft: "8px",
        }}
      >
        {formatDateString(currentSegment.departing_at)}
      </span>
    </h2>
    <p
      className="h3--semibold"
      style={{ color: `var(--GREY-600)`, marginBlock: "0 4px" }}
    >
      {currentPassengerName}
    </p>
  </div>
);

const InactiveSegment: React.FC<{
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick, style }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: "none",
      width: "4px",
      height: "4px",
      padding: "0",
      borderRadius: "4px",
      backgroundColor:
        "var(--TERTIARY, rgba(var(--ACCENT), var(--ACCENT-LIGHT-200)))",
      transition: "background-color 0.3s var(--TRANSITION-CUBIC-BEZIER)",
      ...style,
    }}
  />
);

const ActiveSegment = () => (
  <InactiveSegment
    onClick={undefined}
    style={{
      backgroundColor: "var(--SECONDARY, rgb(var(--ACCENT)))",
    }}
  />
);
