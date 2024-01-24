import React, { PropsWithChildren } from "react";

export const Container: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  const [showing, setShowing] = React.useState(false);

  return (
    <div
      style={{
        border: showing ? "dashed 2px #000000AA" : "dashed 2px #00000033",
        borderRadius: "4px",
        padding: "0 24px 24px",
        marginBottom: "12px",
      }}
    >
      <h3>
        {title}{" "}
        <button
          onClick={() => setShowing(!showing)}
          style={{
            fontSize: "12px",
            color: "#00000088",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Click to {!showing ? "show" : "hide"} example
        </button>
      </h3>
      {showing && children}
    </div>
  );
};
