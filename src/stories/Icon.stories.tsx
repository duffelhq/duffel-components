import { Meta } from "@storybook/react";
import React from "react";
import { Icon, ICON_MAP, IconName } from "../components/shared/Icon";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

export const FullList: React.FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "32px",
    }}
  >
    {Object.keys(ICON_MAP).map((icon) => (
      <div
        key={icon}
        style={{
          padding: "16px",
          border: "dashed 1px lightgrey",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          columnGap: "8px",
        }}
      >
        <Icon name={icon as IconName} />
        <div>{icon}</div>
      </div>
    ))}
  </div>
);
