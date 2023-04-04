import { Icon, IconName } from "@components/Icon";
import classNames from "classnames";
import * as React from "react";

export interface BaseButtonProps {
  /**
   * A space-delimited list of class names to pass along to a child element.
   */
  className?: string;

  /**
   * Is the button currently disabled?
   */
  disabled?: boolean;

  /**
   * An icon to show after the button's label.
   */
  iconAfter?: IconName;

  /**
   * An icon to show before the button's label.
   */
  iconBefore?: IconName;

  /**
   * An icon to show before the button's label.
   */
  iconOnly?: IconName;

  /**
   * What is the intent of the button? This will change the colour of the button.
   */
  intent?: "PRIMARY" | "MUTED" | "INVISIBLE";

  /**
   * The text to be displayed in the button. If `iconOnly` is set, this text will be used as an `aria-label`.
   */
  text: string;
}

export interface ButtonProps extends BaseButtonProps {
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Keydown event handler
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

  /**
   * HTML type attribute of button. Accepted values are "button", "submit", and "reset".
   */
  type?: "button" | "submit" | "reset";

  /**
   * Element ID
   */
  id?: string;
}

/**
 * Useful to communicate actions to your users.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled = false,
      iconAfter,
      iconBefore,
      iconOnly,
      intent = "PRIMARY",
      text,
      type = "button",
      id,
      ...props
    },
    ref
  ) => {
    const cn = classNames("duffel-button", "duffel-button--solid", className, {
      "duffel-button--primary": intent === "PRIMARY",
      "duffel-button--muted": intent === "MUTED",
      "duffel-button--invisible": intent === "INVISIBLE",
      "duffel-button--icon-only": iconOnly,
      "duffel-button--is-disabled": disabled,
    });

    return (
      <button
        ref={ref}
        type={type}
        className={cn}
        disabled={disabled}
        aria-label={text}
        data-testid={id}
        id={id}
        {...props}
      >
        {iconBefore && (
          <Icon
            className="duffel-button__icon duffel-button__icon--before"
            name={iconBefore}
          />
        )}
        {iconOnly && <Icon className="duffel-button__icon" name={iconOnly} />}
        {!iconOnly && <span className="duffel-button__text">{text}</span>}
        {iconAfter && (
          <Icon
            className="duffel-button__icon duffel-button__icon--after"
            name={iconAfter}
          />
        )}
      </button>
    );
  }
);
