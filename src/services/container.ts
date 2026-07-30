import { CacheStorageStore, type CacheStore } from '@/services/cache'
import {
  MockGameDataProvider,
  type GameDataProvider,
} from '@/services/providers'
import {
  createRepositories,
  type MobalithRepositories,
} from '@/services/repositories'
import { UpdateManager } from '@/services/updateManager'

export interface DataContainer {
  provider: GameDataProvider
  cache: CacheStore
  repositories: MobalithRepositories
  updates: UpdateManager
}
export function createDataContainer(
  dependencies: Partial<Pick<DataContainer, 'provider' | 'cache'>> = {},
): DataContainer {
  const provider = dependencies.provider ?? new MockGameDataProvider()
  const cache = dependencies.cache ?? new CacheStorageStore()
  const repositories = createRepositories(provider, cache)
  return {
    provider,
    cache,
    repositories,
    updates: new UpdateManager(repositories),
  }
}
export const dataContainer = createDataContainer()
