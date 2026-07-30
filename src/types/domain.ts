export type EntityId = string
export type ISODateString = string

export enum HeroRole {
  Tank = 'tank',
  Fighter = 'fighter',
  Assassin = 'assassin',
  Mage = 'mage',
  Marksman = 'marksman',
  Support = 'support',
}
export enum ItemCategory {
  Attack = 'attack',
  Magic = 'magic',
  Defense = 'defense',
  Movement = 'movement',
  Jungle = 'jungle',
  Roam = 'roam',
}
export enum Tier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
export enum PatchChangeType {
  Buff = 'buff',
  Nerf = 'nerf',
  Adjustment = 'adjustment',
  Rework = 'rework',
  New = 'new',
}
export enum SearchScope {
  All = 'all',
  Heroes = 'heroes',
  Items = 'items',
  Builds = 'builds',
  Articles = 'articles',
}

export interface DataEntity {
  id: EntityId
  updatedAt: ISODateString
}
export interface Hero extends DataEntity {
  slug: string
  name: string
  roles: HeroRole[]
  specialty: string[]
  difficulty: number
  releaseDate?: ISODateString
  portraitUrl?: string
  attributes: Record<string, number>
}
export interface Item extends DataEntity {
  slug: string
  name: string
  category: ItemCategory
  cost: number
  stats: Record<string, number>
  description: string
  iconUrl?: string
}
export interface Emblem extends DataEntity {
  slug: string
  name: string
  role: HeroRole
  description: string
  talents: EmblemTalent[]
}
export interface EmblemTalent {
  id: EntityId
  name: string
  tier: number
  description: string
}
export interface BattleSpell extends DataEntity {
  slug: string
  name: string
  cooldownSeconds: number
  description: string
  iconUrl?: string
}
export interface TierList extends DataEntity {
  patchId: EntityId
  title: string
  role?: HeroRole
  entries: TierListEntry[]
}
export interface TierListEntry {
  heroId: EntityId
  tier: Tier
  position: number
  note?: string
}
export interface Patch extends DataEntity {
  version: string
  releasedAt: ISODateString
  title: string
  summary: string
  changes: PatchChange[]
}
export interface PatchChange {
  entityType: 'hero' | 'item' | 'emblem' | 'system'
  entityId?: EntityId
  changeType: PatchChangeType
  summary: string
  details?: string
}
export interface Build extends DataEntity {
  heroId: EntityId
  title: string
  itemIds: EntityId[]
  emblemId?: EntityId
  battleSpellId?: EntityId
  author?: string
  tags: string[]
  patchId?: EntityId
}
export interface Counter extends DataEntity {
  heroId: EntityId
  counterHeroId: EntityId
  advantage: number
  rationale: string
  patchId?: EntityId
}
export interface Synergy extends DataEntity {
  heroId: EntityId
  allyHeroId: EntityId
  score: number
  rationale: string
  patchId?: EntityId
}
export interface DraftRecommendation extends DataEntity {
  heroId: EntityId
  recommendation: 'pick' | 'ban' | 'avoid'
  score: number
  rationale: string
  patchId: EntityId
}
export interface MetaTrend extends DataEntity {
  metric: string
  subjectType: 'hero' | 'item' | 'build'
  subjectId: EntityId
  value: number
  direction: 'up' | 'down' | 'stable'
  observedAt: ISODateString
  patchId?: EntityId
}
export interface Article extends DataEntity {
  slug: string
  title: string
  summary: string
  publishedAt: ISODateString
  tags: string[]
  author?: string
  coverImageUrl?: string
}
export type FavoriteTargetType = 'hero' | 'item' | 'build' | 'article'
export interface Favorite {
  type: FavoriteTargetType
  id: EntityId
  savedAt: ISODateString
}
