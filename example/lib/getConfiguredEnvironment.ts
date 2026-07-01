import type { ExampleEnvironment } from "./types.ts";

export function getConfiguredEnvironment(
  environment: ExampleEnvironment,
): "development" | "staging" | "production" {
  if (
    environment.duffelApiUrl.includes("localhost") ||
    environment.tokenProxyUrl.includes("localhost")
  ) {
    return "development";
  }

  if (
    environment.duffelApiUrl.includes("staging") ||
    environment.tokenProxyUrl.includes("staging")
  ) {
    return "staging";
  }

  return "production";
}
