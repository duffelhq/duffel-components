import { getIFrameOriginForEnvironment } from "./getIFrameOriginForEnvironment";
import { getPathnameForIntent } from "./getPathnameForIntent";
import { getTokenFromClientKey } from "./getTokenFromClientKey";
import { DuffelCardFormProps } from "./types";

export function getIframeURL(
  tokenProxyEnvironment: DuffelCardFormProps["tokenProxyEnvironment"],
  intent: DuffelCardFormProps["intent"],
  clientKey: DuffelCardFormProps["clientKey"],
  savedCardData: DuffelCardFormProps["savedCardData"],
) {
  const iFrameOrigin = getIFrameOriginForEnvironment(tokenProxyEnvironment);
  const iframeURL = new URL(iFrameOrigin);

  iframeURL.pathname = getPathnameForIntent(intent);

  iframeURL.searchParams.set("token", getTokenFromClientKey(clientKey));

  if (savedCardData) {
    iframeURL.searchParams.set("card_id", savedCardData.id);
    iframeURL.searchParams.set("card_brand", savedCardData.brand);
  }

  return iframeURL;
}
