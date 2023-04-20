import * as React from "react";
import classNames from "classnames";
import { Icon, IconName } from "./Icon";

export interface CardProps {
  title: string;
  icon: IconName;
  onClick?: (() => void) | null;
  children: React.ReactNode;
  copy: string;
  isLoading?: boolean;
  disabled?: boolean;
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  copy,
  onClick,
  children,
  isLoading,
  disabled,
  isSelected,
}) => {
  const hasChildren = React.Children.toArray(children).length > 0;

  return (
    <button
      title="Select extra baggage"
      {...(onClick && { onClick })}
      disabled={disabled}
      className={classNames(
        "ancillary-card",
        isLoading && "ancillary-card--loading"
      )}
      // We are using inline styles here because
      // we don't want the cards to appear unstyled
      // before the CSS stylesheet loads.
      // This is important for this component since it
      // be on visible on the page when it loads.
      style={{
        background: "transparent",
        border: "solid 1px rgba(226, 226, 232, 1)",
        display: "flex",
        rowGap: "4px",
        padding: "20px",
        borderRadius: "8px",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        letterSpacing: "0em",
        cursor: "pointer",
        transition:
          "border-color 0.3s var(--TRANSITION-CUBIC-BEZIER) background-color 0.3s var(--TRANSITION-CUBIC-BEZIER)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBlock: "0",
          textAlign: "start",
          marginTop: "2px",
          columnGap: "12px",
          width: "100%",
        }}
      >
        {isSelected ? (
          <Icon name="check" className="ancillary-card__selected-icon" />
        ) : (
          <Icon name={icon} />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            width: "100%",
          }}
        >
          <p
            className="p1--semibold"
            style={{
              marginBlock: "0",
            }}
          >
            {title}
          </p>
          <div className="ancillary-card__children">
            {hasChildren ? (
              children
            ) : (
              <Icon
                name="expand_content"
                className="ancillary-card__expand-icon"
              />
            )}
          </div>
        </div>
      </div>
      <p
        className="p1--regular"
        style={{
          textAlign: "start",
          color: "var(--GREY-600)",
          marginLeft: "34px",
          marginBlock: "0",
        }}
      >
        {copy}
      </p>
    </button>
  );
};
