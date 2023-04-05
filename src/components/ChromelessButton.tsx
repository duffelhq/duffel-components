import classnames from "classnames";
import * as React from "react";

export interface ChromelessButtonProps {
  /**
   * A space-delimited list of class names to pass along to a child element.
   */
  className?: string;

  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Keydown event handler
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;

  /**
   * The type of the button
   */
  type?: "button" | "submit" | "reset";

  /**
   * Element ID
   */
  id?: string;
  style?: React.CSSProperties;
}

/**
 * A button that has all styling removed. This is useful for a base for custom buttons.
 */
export const ChromelessButton: React.FC<
  React.PropsWithChildren<ChromelessButtonProps>
> = ({ className, children, ...props }) => {
  const cn = classnames("chromeless-button", className);

  return (
    <button className={cn} {...props}>
      {children}

      {/* <style jsx>{`
        .chromeless-button {
          -webkit-appearance: none;
          background-color: transparent;
          border: none;
          border-radius: 0;
          box-sizing: border-box;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          font-weight: normal;
          line-height: 1;
          margin: 0;
          outline: none;
          padding: 0;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          user-select: none;
        }
      `}</style> */}
    </button>
  );
};
