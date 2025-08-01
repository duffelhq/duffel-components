import * as React from "react";
import classNames from "classnames";
import { VSpace } from "@components/shared/VSpace";
import { HSpace } from "@components/shared/HSpace";
import { Color } from "@lib/colors";

export interface TimelineItemProps {
  label?: string | React.ReactNode;
  description?: string;
  dot?: boolean;
  dotColor?: Color;
  lineColorLeft?: Color;
  lineColorRight?: Color;
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";
  tooltip?: string | boolean;
  aboveDot?: React.ReactNode;
  date?: string;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      label,
      description,
      dot = true,
      dotColor,
      lineColorLeft = "var(--GREY-300)",
      lineColorRight = "var(--GREY-300)",
      tooltip,
      size,
      aboveDot,
      date,
    },
    ref,
  ) => {
    return (
      <VSpace
        space={12}
        className={classNames("timeline-item-container", {
          "timeline-item-container--extra-small": size === "extra-small",
          "timeline-item-container--small": size === "small",
          "timeline-item-container--large": size === "large",
          "timeline-item-container--extra-large": size === "extra-large",
        })}
        ref={ref}
      >
        {tooltip && (
          <div className="timeline-item-tooltip">
            Today
            <div className="timeline-item-tooltip-arrow" />
          </div>
        )}
        <HSpace space={0}>
          <div
            className="timeline-item-line"
            style={{ backgroundColor: `var(${lineColorLeft})` }}
          />
          {aboveDot && (
            <div className="timeline-item-above-dot">{aboveDot}</div>
          )}
          {dot && (
            <div
              className="timeline-item-dot"
              style={dotColor ? { backgroundColor: `var(${dotColor})` } : {}}
            />
          )}
          {label && (
            <VSpace space={0} className="timeline-item">
              {date && (
                <p style={{ textAlign: "center", color: "var(--GREY-600)" }}>
                  {date}
                </p>
              )}
              <p style={{ textAlign: "center", fontWeight: "medium" }}>
                {label}
              </p>
              <p style={{ textAlign: "center" }}>{description}</p>
            </VSpace>
          )}
          <div
            className="timeline-item-line"
            style={{
              backgroundColor: `var(${lineColorRight})`,
              left: dot ? "calc(50% + 8px)" : "50%",
              width: dot ? "calc(50% - 8px)" : "50%",
            }}
          />
        </HSpace>
      </VSpace>
    );
  },
);
