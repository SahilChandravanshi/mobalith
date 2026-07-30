import { DATA_CACHE_NAMESPACE, DEFAULT_CACHE_TTL_MS } from '@/data/constants'
import { isExpired } from '@/utils/time'

export interface CachedValue<T> {
  value: T
  expiresAt: number
}
export interface CacheStore {
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T, ttlMs?: number): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
}

export class MemoryCacheStore implements CacheStore {
  private readonly entries = new Map<string, CachedValue<unknown>>()
  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.entries.get(key)
    if (!entry || isExpired(entry.expiresAt)) {
      this.entries.delete(key)
      return undefined
    }
    return entry.value as T
  }
  async set<T>(key: string, value: T, ttlMs = DEFAULT_CACHE_TTL_MS) {
    this.entries.set(key, { value, expiresAt: Date.now() + ttlMs })
  }
  async delete(key: string) {
    this.entries.delete(key)
  }
  async clear() {
    this.entries.clear()
  }
}

export class CacheStorageStore implements CacheStore {
  constructor(
    private readonly namespace = DATA_CACHE_NAMESPACE,
    private readonly fallback: CacheStore = new MemoryCacheStore(),
  ) {}
  private get available() {
    return typeof caches !== 'undefined'
  }
  private request(key: string) {
    return new Request(
      `https://mobalith.local/cache/${encodeURIComponent(key)}`,
    )
  }
  async get<T>(key: string): Promise<T | undefined> {
    if (!this.available) return this.fallback.get<T>(key)
    const response = await (
      await caches.open(this.namespace)
    ).match(this.request(key))
    if (!response) return undefined
    const entry = (await response.json()) as CachedValue<T>
    if (isExpired(entry.expiresAt)) {
      await this.delete(key)
      return undefined
    }
    return entry.value
  }
  async set<T>(key: string, value: T, ttlMs = DEFAULT_CACHE_TTL_MS) {
    if (!this.available) return this.fallback.set(key, value, ttlMs)
    await (
      await caches.open(this.namespace)
    ).put(
      this.request(key),
      new Response(JSON.stringify({ value, expiresAt: Date.now() + ttlMs }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  }
  async delete(key: string) {
    if (!this.available) return this.fallback.delete(key)
    await (await caches.open(this.namespace)).delete(this.request(key))
  }
  async clear() {
    if (!this.available) return this.fallback.clear()
    await caches.delete(this.namespace)
  }
}
