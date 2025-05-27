import { logGroup } from "./logging";

export interface ErrorResponse extends Response {
  data: { meta: any; errors: any[] };
}
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return "data" in response && Array.isArray(response.data.errors);
};

const DUFFEL_API_URL = process.env.DUFFEL_API_URL;
const COMPONENT_VERSION = process.env.COMPONENT_VERSION;

export async function fetchFromDuffelAPI(
  withClientKey: string,
  path: string,
  method = "GET",
  body?: string
) {
  logGroup("Making request to the Duffel API", { path, method });
  const fullUrl = `${DUFFEL_API_URL}/ancillaries-component/${path}`;
  let response: Response | null = null;
  try {
    response = await fetch(fullUrl, {
      method,
      body,
      headers: {
        "Duffel-Version": "v2",
        Authorization: `Bearer ${withClientKey}`,
        "User-Agent": `Duffel/ancillaries-component@${COMPONENT_VERSION}`,
      },
    });
  } catch (error) {
    logGroup("Failed to make request to the Duffel API", { error });
    throw error;
  }

  const data = await response.json();
  if (Array.isArray(data.errors)) {
    logGroup("Request to the Duffel API failed", {
      operation: `${method} ${fullUrl}`,
      method,
      request_id: data?.meta?.request_id,
      errors: data.errors,
      status: response.status,
    });
    throw { ...response, data };
  } else {
    logGroup("Request to the Duffel succeeded", {
      request_id: data?.meta?.request_id,
    });
  }

  return data;
}
