import type { Offer } from "@duffel/api/types";
import { serialiseForInlineScript } from "./serialiseForInlineScript.ts";
import type { ExamplePassengers, SeatMaps } from "./types.ts";

interface RenderIndexHTMLArguments {
  componentScriptURL: string;
  configuredEnvironment: string;
  duffelApiUrl: string;
  offer: Offer;
  passengers: ExamplePassengers;
  seatMaps: SeatMaps;
  template: string;
  tokenProxyUrl: string;
}

export function renderIndexHTML({
  componentScriptURL,
  configuredEnvironment,
  duffelApiUrl,
  offer,
  passengers,
  seatMaps,
  template,
  tokenProxyUrl,
}: RenderIndexHTMLArguments): string {
  const withComponentScriptURL = template.replaceAll(
    "__COMPONENT_SCRIPT_URL__",
    componentScriptURL,
  );
  const withEnvironment = withComponentScriptURL.replaceAll(
    "__ENVIRONMENT__",
    configuredEnvironment,
  );
  const withDuffelAPIURL = withEnvironment.replaceAll(
    "__DUFFEL_API_URL__",
    duffelApiUrl,
  );
  const withTokenProxyURL = withDuffelAPIURL.replaceAll(
    "__TOKEN_PROXY_URL__",
    tokenProxyUrl,
  );
  const withOffer = withTokenProxyURL.replace(
    `"__OFFER__"`,
    serialiseForInlineScript(offer),
  );
  const withSeatMaps = withOffer.replace(
    `"__SEAT_MAPS__"`,
    serialiseForInlineScript(seatMaps),
  );

  return withSeatMaps.replace(
    `"__PASSENGERS__"`,
    serialiseForInlineScript(passengers),
  );
}
