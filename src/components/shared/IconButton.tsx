import classNames from "classnames";
import * as React from "react";
import { Icon, IconName } from "./Icon";

const ICON_BUTTON_VARIANTS = {
  primary: "icon-button--primary",
  outlined: "icon-button--outlined",
};

type IconButtonVariants = keyof typeof ICON_BUTTON_VARIANTS;

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface IconButtonProps
  extends Pick<NativeButtonProps, "id" | "onClick" | "disabled" | "className"> {
  "data-testid"?: string;
  icon: IconName;
  title: string;
  variant?: IconButtonVariants;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "primary",
  className,
  ...nativeButtonProps
}) => (
  <button
    type="button"
    className={classNames(
      "icon-button",
      ICON_BUTTON_VARIANTS[variant],
      className
    )}
    {...nativeButtonProps}
  >
    <Icon name={icon} />
  </button>
);
