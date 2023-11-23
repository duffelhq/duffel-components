import * as React from "react";
import classNames from "classnames";

type DivProps = JSX.IntrinsicElements["div"];
export interface VSpaceProps extends DivProps {
  /**
   * A space-delimited list of class names to pass along to a child element.
   */
  className?: string;

  /**
   * The vertical spacing between each child element
   */
  space: 0 | 4 | 8 | 16;
}
export const VSpace: React.FC<VSpaceProps> = ({
  className,
  space,
  ...divProps
}) => (
  <div
    className={classNames("v-space", `v-space--${space}`, className)}
    {...divProps}
  ></div>
);
