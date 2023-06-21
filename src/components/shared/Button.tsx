import { Icon, IconName } from "@components/shared/Icon";
import classNames from "classnames";
import * as React from "react";

const BUTTON_VARIANTS = {
  primary: "button--primary",
  outlined: "button--outlined",
  destructive: "button--destructive",
};
type ButtonVariants = keyof typeof BUTTON_VARIANTS;

const BUTTON_SIZES = {
  32: "button--32",
  40: "button--40",
  48: "button--48",
};

type ButtonSizes = keyof typeof BUTTON_SIZES;

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps
  extends Pick<
    NativeButtonProps,
    "id" | "onClick" | "disabled" | "children" | "className" | "type"
  > {
  "data-testid"?: string;
  iconBefore?: IconName;
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

export const Button: React.FC<ButtonProps> = ({
  iconBefore,
  variant = "primary",
  size = 40,
  children,
  className,
  type = "button",
  ...nativeButtonProps
}) => (
  <button
    type={type}
    className={classNames(
      "button",
      BUTTON_VARIANTS[variant],
      BUTTON_SIZES[size],
      className
    )}
    {...nativeButtonProps}
  >
    {iconBefore && (
      <Icon
        className="duffel-button__icon duffel-button__icon--before"
        name={iconBefore}
      />
    )}
    {children}
  </button>
);
