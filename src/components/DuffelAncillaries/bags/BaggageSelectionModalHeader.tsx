import { formatDateString } from "@lib/formatDate";
import React from "react";
import { OfferSliceSegment } from "../../../types/Offer";

export interface BaggageSelectionModalHeaderProps {
  segmentCount: number;
  currentSegmentIndex: number;
  currentSegment: OfferSliceSegment;
  setCurrentSegmentIndex: (index: number) => void;
}

export const BaggageSelectionModalHeader: React.FC<
  BaggageSelectionModalHeaderProps
> = ({
  segmentCount,
  currentSegmentIndex,
  currentSegment,
  setCurrentSegmentIndex,
}) => (
  <div style={{ padding: "24px 24px 16px" }}>
    <div style={{ display: "flex", columnGap: "4px" }}>
      {Array(segmentCount)
        .fill(0)
        .map((_, index) =>
          index === currentSegmentIndex ? (
            <ActiveSegment key={`segment_${index}`} />
          ) : (
            <InactiveSegment
              key={`segment_${index}`}
              onClick={() => setCurrentSegmentIndex(index)}
            />
          )
        )}
    </div>
    <h2 className="h3--semibold" style={{ marginTop: "12px" }}>
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
  </div>
);

const InactiveSegment: React.FC<{
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      border: "none",
      width: "4px",
      height: "4px",
      padding: "0",
      borderRadius: "4px",
      backgroundColor: "rgba(var(--ACCENT), var(--ACCENT-LIGHT-200))",
      transition: "background-color 0.3s var(--TRANSITION-CUBIC-BEZIER)",
      ...style,
    }}
  />
);

const ActiveSegment = () => (
  <InactiveSegment
    onClick={undefined}
    style={{
      backgroundColor: "rgb(var(--ACCENT))",
    }}
  />
);
