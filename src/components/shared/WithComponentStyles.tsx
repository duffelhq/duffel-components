import * as React from "react";

const COMPONENT_CDN = process.env.COMPONENT_CDN || "";
export const hrefToComponentStyles = `${COMPONENT_CDN}/global.css`;

type WithComponentStylesProps = {
  children?: React.ReactNode;
};

export const WithComponentStyles: React.FC<WithComponentStylesProps> = ({
  children,
}) => (
  <>
    <link rel="stylesheet" href={hrefToComponentStyles}></link>
    <div className="duffel-components">{children}</div>
  </>
);
