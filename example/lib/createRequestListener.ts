import type { RequestListener } from "http";
import { handleRequest } from "./handleRequest.ts";
import type { ServerContext } from "./types.ts";

export function createRequestListener(context: ServerContext): RequestListener {
  return handleRequest.bind(undefined, context);
}
