import http, { type IncomingMessage, type ServerResponse } from "http";
import { createOrderOnDuffel } from "./createOrderOnDuffel.ts";
import type { ServerContext } from "./types.ts";

export async function handleCreateOrderRoute(
  context: ServerContext,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  if (request.method !== "POST") {
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
    return;
  }

  await createOrderOnDuffel(
    request,
    response,
    context.environment,
    context.duffelHeaders,
  );
}
