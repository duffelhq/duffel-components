import * as React from "react";

export const NonIdealState: React.FC<
  React.PropsWithChildren<{ style?: React.CSSProperties }>
> = ({ style, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "dashed 1px var(--GREY-300)",
      borderRadius: "4px",
      paddingBlock: "32px",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "470px",
      }}
    >
      {children}
    </div>
  </div>
);
