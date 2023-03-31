import * as React from "react";

export const Modal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      style={{
        top: "0",
        left: "0",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "#00000059",
        zIndex: "999",
      }}
    >
      <div
        role="presentation"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
