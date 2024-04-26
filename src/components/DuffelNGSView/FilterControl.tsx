import { Icon } from "@components/shared/Icon";
import classNames from "classnames";
import React from "react";

interface FilterControlProps {
  target: React.ReactNode;
  children: (closePopover: () => void) => React.ReactNode;
  disabled?: boolean;
}

export const FilterControl: React.FC<FilterControlProps> = ({
  target,
  children,
  disabled,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }
  function closePopover() {
    setIsPopoverOpen(false);
  }

  return (
    <div className="filter-control">
      <button
        onClick={togglePopover}
        className="filter-control__target"
        disabled={disabled}
      >
        {target}
      </button>
      {isPopoverOpen && (
        <>
          {/**
           * Disabling jsx-a11y/click-events-have-key-events because it expects a keyboard listener.
           * Instead the esc key listener to close is added to options in the popover through `children`
           * */}
          {/* eslint-disable-next-line */}
          <div className="filter-control__backdrop" onClick={closePopover} />
          <div className="filter-control__popover">
            {children(closePopover)}
          </div>
        </>
      )}
    </div>
  );
};

interface FilterControlOptionProps {
  children: React.ReactNode;
  className?: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FilterControlOption: React.FC<FilterControlOptionProps> = ({
  className,
  children,
  isSelected,
  onClick,
  onKeyDown,
  onDoubleClick,
}) => (
  <button
    onClick={onClick}
    className={classNames(
      "filter-control__option",
      isSelected && "filter-control__option--selected",
      className,
    )}
    onKeyDown={onKeyDown}
    onDoubleClick={onDoubleClick}
  >
    {children}
    {isSelected && <Icon name="check" size={24} color="--GREY-900" />}
  </button>
);
