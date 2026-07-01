import { readFileSync } from "fs";
import http, { type ServerResponse } from "http";
import { getComponentScriptURL } from "./getComponentScriptURL.ts";
import { getConfiguredEnvironment } from "./getConfiguredEnvironment.ts";
import { getPassengersForOffer } from "./getPassengersForOffer.ts";
import { renderIndexHTML } from "./renderIndexHTML.ts";
import { retrieveSeatMapsOnDuffel } from "./retrieveSeatMapsOnDuffel.ts";
import { searchRoundTripOnDuffel } from "./searchRoundTripOnDuffel.ts";
import type { ServerContext } from "./types.ts";

export async function handleIndexRoute(
  context: ServerContext,
  response: ServerResponse,
): Promise<void> {
  const offerRequest = await searchRoundTripOnDuffel(
    "JFK",
    "MIA",
    context.environment,
    context.duffelHeaders,
  );
  const offer = offerRequest.offers[0];

  if (!offer) {
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
    return;
  }

  const seatMaps = await retrieveSeatMapsOnDuffel(
    offer.id,
    context.environment,
    context.duffelHeaders,
  );
  const passengers = getPassengersForOffer(offer);
  const template = readFileSync(context.environment.htmlFilePath, {
    encoding: "utf-8",
  });
  const html = renderIndexHTML({
    componentScriptURL: getComponentScriptURL(context.environment),
    configuredEnvironment: getConfiguredEnvironment(context.environment),
    duffelApiUrl: context.environment.duffelApiUrl,
    offer,
    passengers,
    seatMaps,
    template,
    tokenProxyUrl: context.environment.tokenProxyUrl,
  });

  response.writeHead(200);
  response.end(html);
}
