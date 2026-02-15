import * as React from "react";

const COMPONENT_CDN = process.env.COMPONENT_CDN || "";
export const hrefToComponentStyles = `${COMPONENT_CDN}/global.css`;

type WithComponentStylesProps = {
  children?: React.ReactNode;
};

export const handleCSSLoadError = (event: React.SyntheticEvent<HTMLLinkElement>) => {
  const linkElement = event.currentTarget;
  const href = linkElement.href;
  
  console.warn(
    "[Duffel Components] Failed to load CSS file from:", 
    href,
    "\n\nThis usually happens when:",
    "\n- COMPONENT_CDN is misconfigured",
    "\n- The CDN server is not running (for local development)",
    "\n- Network connectivity issues",
    "\n\nFor production, use: COMPONENT_CDN=https://assets.duffel.com/components",
    "\nFor local development, make sure to run 'yarn dev' and use: COMPONENT_CDN=https://localhost:3200",
    "\n\nNote: If you're seeing localhost:8000, this is likely a misconfiguration.",
    "\nThe development server runs on port 3200, not 8000."
  );
  
  // Remove the failed link element to prevent further errors
  if (linkElement.parentNode) {
    linkElement.parentNode.removeChild(linkElement);
  }
};

export const WithComponentStyles: React.FC<WithComponentStylesProps> = ({
  children,
}) => (
  <>
    <link 
      rel="stylesheet" 
      href={hrefToComponentStyles}
      onError={handleCSSLoadError}
    />
    <div className="duffel-components">{children}</div>
  </>
);
