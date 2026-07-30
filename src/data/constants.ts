import { HeroRole, ItemCategory, SearchScope, Tier } from '@/types'

export const APP_STORAGE_PREFIX = 'mobalith'
export const DATA_CACHE_NAMESPACE = 'mobalith-data-v1'
export const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000
export const QUERY_STALE_TIME_MS = 5 * 60 * 1000
export const QUERY_GC_TIME_MS = 24 * 60 * 60 * 1000
export const HERO_ROLES = Object.values(HeroRole)
export const ITEM_CATEGORIES = Object.values(ItemCategory)
export const TIERS = Object.values(Tier)
export const SEARCH_SCOPES = Object.values(SearchScope)
