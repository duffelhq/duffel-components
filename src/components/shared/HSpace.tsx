import * as React from "react";
import classNames from "classnames";

type DivProps = JSX.IntrinsicElements["div"];
export interface HSpaceProps extends DivProps {
  /**
   * A space-delimited list of class names to pass along to a child element.
   */
  className?: string;

  /**
   * The vertical spacing between each child element
   */
  space: 0 | 4 | 8 | 12 | 16;

  /**
   * If you'd like all children inside your horizontal space container
   * to be vertically aligned to the center of the div, you can set `alignCenter` to `true`
   *
   * Default: `false`
   */
  alignCenter?: boolean;
}
export const HSpace: React.FC<HSpaceProps> = ({
  className,
  space,
  alignCenter,
  ...divProps
}) => (
  <div
    className={classNames(
      "h-space",
      alignCenter && "hspace--align-center",
      `h-space--${space}`,
      className
    )}
    {...divProps}
  ></div>
);
