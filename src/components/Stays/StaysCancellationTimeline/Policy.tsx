import { HSpace } from "@components/shared/HSpace";
import { Icon, IconName } from "@components/shared/Icon";
import { Color } from "@lib/colors";
import * as React from "react";

export const Policy: React.FC<
  React.PropsWithChildren<{
    iconName: IconName;
    iconColor: Color;
    label?: string;
  }>
> = ({ iconName, iconColor, label, children }) => (
  <HSpace space={8}>
    <div className="u-paddingTop2">
      <Icon size={16} name={iconName} color={iconColor} />
    </div>
    <p style={{ color: "var(--GREY-600)" }}>
      {label && (
        <>
          <span style={{ fontWeight: "medium", color: "var(--GREY-900)" }}>
            {label}
          </span>{" "}
          —{" "}
        </>
      )}
      {children}
    </p>
  </HSpace>
);
