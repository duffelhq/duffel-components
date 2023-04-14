const DUFFEL_API_URL = process.env.DUFFEL_API_URL;
const COMPONENT_VERSION = process.env.COMPONENT_VERSION;

export async function fetchFromDuffelAPI(
  withClientKey: string,
  path: string,
  method = "GET",
  body?: string
) {
  const response = await fetch(
    `${DUFFEL_API_URL}/ancillaries-component/${path}`,
    {
      method,
      body,
      headers: {
        "Duffel-Version": "v1",
        Authorization: `Bearer ${withClientKey}`,
        "User-Agent": `Duffel/ancillaries-component/${COMPONENT_VERSION}`,
      },
    }
  );

  return await response.json();
}
