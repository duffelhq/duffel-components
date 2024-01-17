import { DuffelCardFormProps } from "./types";

export function getIFrameOriginForEnvironment(
  tokenProxyEnvironment: DuffelCardFormProps["tokenProxyEnvironment"]
): string {
  let origin = "https://api.duffel.cards";
  if (tokenProxyEnvironment === "staging") {
    origin = "https://api.staging.duffel.cards";
  } else if (tokenProxyEnvironment === "development") {
    origin = "https://localhost:8000";
  }

  return origin;
}
