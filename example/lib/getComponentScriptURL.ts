import type { ExampleEnvironment } from "./types.ts";

export function getComponentScriptURL(environment: ExampleEnvironment): string {
  const componentCDN =
    environment.componentCdn ?? "https://assets.duffel.com/components";
  const normalisedComponentCDN = componentCDN.replace(/\/$/, "");
  const includesVersion = /\/\d+\.\d+\.\d+(-[^/]+)?$/.test(
    normalisedComponentCDN,
  );
  const baseURL =
    normalisedComponentCDN.includes("localhost") || includesVersion
      ? normalisedComponentCDN
      : `${normalisedComponentCDN}/${environment.packageVersion}`;

  return `${baseURL}/duffel-ancillaries.js`;
}
