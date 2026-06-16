import type { DuffelHeaders } from "./types.ts";

export function getDuffelHeaders(duffelApiToken: string): DuffelHeaders {
  return {
    "Duffel-Version": "v2",
    "Accept-Encoding": "gzip",
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${duffelApiToken}`,
  };
}
