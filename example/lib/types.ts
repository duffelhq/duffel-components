import type { CreateOrder, Offer, SeatMap } from "@duffel/api/types";
import type { IncomingMessage, ServerResponse } from "http";

export interface ExampleEnvironment {
  componentCdn?: string;
  duffelApiToken: string;
  duffelApiUrl: string;
  htmlFilePath: string;
  packageVersion: string;
  tokenProxyUrl: string;
}

export type DuffelHeaders = Record<string, string>;

export interface ServerContext {
  duffelHeaders: DuffelHeaders;
  environment: ExampleEnvironment;
}

export interface OfferRequest {
  offers: Offer[];
}

export type SeatMaps = SeatMap[];

export type ExamplePassengers = CreateOrder["passengers"];

export type RequestHandler = (
  context: ServerContext,
  request: IncomingMessage,
  response: ServerResponse,
) => Promise<void>;
