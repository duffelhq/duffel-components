import { captureErrorInSentry } from "@lib/captureErrorInSentry";
import * as React from "react";

interface AirlineLogoProps {
  name: string;
  iataCode: string | null;
  size?: number;
}

const hasManualOverride = ["TA"];
const getFallbackLogoUrl = (iataCode: string | null) =>
  `https://www.gstatic.com/flights/airline_logos/70px/${
    iataCode || "missing"
  }.png`;

const getSrcForIataCode = (iataCode: string | null, airlineName: string) => {
  if (!iataCode) {
    captureErrorInSentry(
      new Error(`iataCode is passed as "null" value for airline ${airlineName}`)
    );
    return getFallbackLogoUrl("ZZ");
  }

  if (hasManualOverride.includes(iataCode)) {
    return getFallbackLogoUrl(iataCode);
  }

  return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iataCode}.svg`;
};

export const AirlineLogo: React.FC<AirlineLogoProps> = ({
  name,
  iataCode,
  size = 32,
}) => {
  const [src, setSrc] = React.useState(getSrcForIataCode(iataCode, name));
  React.useEffect(() => {
    setSrc(getSrcForIataCode(iataCode, name));
  }, [iataCode]);

  return (
    <React.Fragment>
      {/* disabling eslint here because using next/legacy/image made the svg disappear on the airline show page */}
      <img
        alt={name}
        title={name}
        height={size}
        width={size}
        src={src}
        onError={() => setSrc(getFallbackLogoUrl(iataCode))}
      />
    </React.Fragment>
  );
};
