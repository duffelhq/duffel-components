import { readFileSync } from "fs";
import path from "path";
import type { ExampleEnvironment } from "./types.ts";

const DEFAULT_DUFFEL_API_URL = "https://api.duffel.com";
const DEFAULT_TOKEN_PROXY_URL = "https://api.duffel.cards";

export function getExampleEnvironment(
  exampleDirectory: string,
): ExampleEnvironment {
  const duffelApiUrl = process.env.DUFFEL_API_URL ?? DEFAULT_DUFFEL_API_URL;
  const duffelApiToken = process.env.DUFFEL_API_TOKEN;
  const tokenProxyUrl = process.env.TOKEN_PROXY_URL ?? DEFAULT_TOKEN_PROXY_URL;

  if (duffelApiUrl.includes("localhost")) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  if (duffelApiToken === undefined) {
    throw new Error("process.env.DUFFEL_API_TOKEN is required but missing");
  }

  const packageJsonPath = path.resolve(exampleDirectory, "../package.json");
  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, { encoding: "utf-8" }),
  ) as { version: string };

  return {
    componentCdn: process.env.COMPONENT_CDN,
    duffelApiToken,
    duffelApiUrl,
    htmlFilePath: path.resolve(exampleDirectory, "./index.html"),
    packageVersion: packageJson.version,
    tokenProxyUrl,
  };
}
