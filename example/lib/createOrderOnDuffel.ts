import type { IncomingMessage, ServerResponse } from "http";
import type { DuffelHeaders, ExampleEnvironment } from "./types.ts";

export async function createOrderOnDuffel(
  request: IncomingMessage,
  response: ServerResponse,
  environment: ExampleEnvironment,
  duffelHeaders: DuffelHeaders,
): Promise<void> {
  const requestOptions = {
    method: "POST",
    headers: duffelHeaders,
    body: request,
    duplex: "half",
  } as unknown as RequestInit;
  const createOrderOnDuffelResponse = await fetch(
    `${environment.duffelApiUrl}/air/orders`,
    requestOptions,
  );

  response.writeHead(createOrderOnDuffelResponse.status, {
    "Content-type": "application/json",
  });
  response.write(await createOrderOnDuffelResponse.text());
  response.end();
}
