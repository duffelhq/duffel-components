const DUFFEL_API_URL = "https://localhost:4000";

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
      },
    }
  );

  return await response.json();
}
