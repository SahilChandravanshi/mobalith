export async function fetchJson<T>(
  url: string
): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}. (${response.status})`
    );
  }

  return response.json() as Promise<T>;
}