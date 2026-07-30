export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export interface HttpRequest {
  path: string
  method?: HttpMethod
  headers?: HeadersInit
  body?: BodyInit | null
  signal?: AbortSignal
}
export interface HttpClient {
  request<T>(request: HttpRequest): Promise<T>
}
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export class FetchHttpClient implements HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}
  async request<T>({
    path,
    method = 'GET',
    headers,
    body,
    signal,
  }: HttpRequest): Promise<T> {
    const response = await this.fetcher(new URL(path, this.baseUrl), {
      method,
      headers,
      body,
      signal,
    })
    if (!response.ok)
      throw new HttpError(response.status, `Request failed: ${response.status}`)
    return response.json() as Promise<T>
  }
}
