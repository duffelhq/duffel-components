export async function fetchDuffelJSON<ResponseBody>(
  url: string,
  options: RequestInit,
): Promise<ResponseBody> {
  const response = await fetch(url, options);
  const responseBody = (await response.json()) as ResponseBody;

  if (!response.ok) {
    throw new Error(
      `Duffel API request failed with ${response.status}: ${JSON.stringify(
        responseBody,
      )}`,
    );
  }

  return responseBody;
}
