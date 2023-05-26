import { Icon, IconName } from "@components/Icon";
import classNames from "classnames";
import * as React from "react";

const BUTTON_VARIANTS = {
  primary: "button--primary",
  outlined: "button--outlined",
  destructive: "button--destructive",
};

type ButtonVariants = keyof typeof BUTTON_VARIANTS;

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps
  extends Pick<
    NativeButtonProps,
    "id" | "onClick" | "disabled" | "children" | "className"
  > {
  "data-testid"?: string;
  iconBefore?: IconName;
  variant?: ButtonVariants;
}

export const Button: React.FC<ButtonProps> = ({
  iconBefore,
  variant = "primary",
  children,
  className,
  ...nativeButtonProps
}) => (
  <button
    type="button"
    className={classNames("button", BUTTON_VARIANTS[variant], className)}
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
