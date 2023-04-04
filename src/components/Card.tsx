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
    >
      <div className="ancillary-card__title-icon-and-children">
        {isSelected ? (
          <Icon name="check" className="ancillary-card__selected-icon" />
        ) : (
          <Icon name={icon} />
        )}
        <div className="ancillary-card__title-and-children">
          <p className="p1--semibold ancillary-card__title">{title}</p>
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
      <p className="p1--regular ancillary-card__copy">{copy}</p>
    </button>
  );
};
