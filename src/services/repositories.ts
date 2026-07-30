import { DEFAULT_CACHE_TTL_MS } from '@/data/constants'
import type {
  Article,
  BattleSpell,
  Build,
  Counter,
  DraftRecommendation,
  Emblem,
  Hero,
  Item,
  MetaTrend,
  Patch,
  Synergy,
  TierList,
} from '@/types'
import { MemoryCacheStore, type CacheStore } from '@/services/cache'
import {
  MockGameDataProvider,
  type GameDataProvider,
  type MockDataSets,
} from '@/services/providers'

export interface Repository<T> {
  list(options?: {
    force?: boolean
    signal?: AbortSignal
  }): Promise<readonly T[]>
}
type ProviderMethod<T> = (signal?: AbortSignal) => Promise<T[]>

class ProviderRepository<T> implements Repository<T> {
  constructor(
    private readonly key: string,
    private readonly loader: ProviderMethod<T>,
    private readonly cache: CacheStore,
    private readonly ttlMs = DEFAULT_CACHE_TTL_MS,
  ) {}
  async list({
    force = false,
    signal,
  }: { force?: boolean; signal?: AbortSignal } = {}): Promise<readonly T[]> {
    if (!force) {
      const cached = await this.cache.get<T[]>(this.key)
      if (cached) return cached
    }
    const data = await this.loader(signal)
    await this.cache.set(this.key, data, this.ttlMs)
    return data
  }
}

export interface MobalithRepositories {
  heroes: Repository<Hero>
  items: Repository<Item>
  emblems: Repository<Emblem>
  battleSpells: Repository<BattleSpell>
  tierLists: Repository<TierList>
  patches: Repository<Patch>
  builds: Repository<Build>
  counters: Repository<Counter>
  synergies: Repository<Synergy>
  draftRecommendations: Repository<DraftRecommendation>
  metaTrends: Repository<MetaTrend>
  articles: Repository<Article>
}

export function createRepositories(
  provider: GameDataProvider,
  cache: CacheStore,
): MobalithRepositories {
  return {
    heroes: new ProviderRepository('heroes', provider.getHeroes, cache),
    items: new ProviderRepository('items', provider.getItems, cache),
    emblems: new ProviderRepository('emblems', provider.getEmblems, cache),
    battleSpells: new ProviderRepository(
      'battle-spells',
      provider.getBattleSpells,
      cache,
    ),
    tierLists: new ProviderRepository(
      'tier-lists',
      provider.getTierLists,
      cache,
    ),
    patches: new ProviderRepository('patches', provider.getPatches, cache),
    builds: new ProviderRepository('builds', provider.getBuilds, cache),
    counters: new ProviderRepository('counters', provider.getCounters, cache),
    synergies: new ProviderRepository(
      'synergies',
      provider.getSynergies,
      cache,
    ),
    draftRecommendations: new ProviderRepository(
      'draft-recommendations',
      provider.getDraftRecommendations,
      cache,
    ),
    metaTrends: new ProviderRepository(
      'meta-trends',
      provider.getMetaTrends,
      cache,
    ),
    articles: new ProviderRepository('articles', provider.getArticles, cache),
  }
}

export function createMockRepositories(data: MockDataSets = {}): MobalithRepositories {
  return createRepositories(new MockGameDataProvider(data), new MemoryCacheStore())
}
