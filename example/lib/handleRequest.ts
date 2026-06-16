import http, { type IncomingMessage, type ServerResponse } from "http";
import { handleCreateOrderRoute } from "./handleCreateOrderRoute.ts";
import { handleIndexRoute } from "./handleIndexRoute.ts";
import type { ServerContext } from "./types.ts";

export async function handleRequest(
  context: ServerContext,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const requestPath = request.url?.split("?")[0];

  if (requestPath === "/") {
    await handleIndexRoute(context, response);
    return;
  }

  if (requestPath === "/create-order") {
    await handleCreateOrderRoute(context, request, response);
    return;
  }

  response.writeHead(404);
  response.end(http.STATUS_CODES[404]);
}
