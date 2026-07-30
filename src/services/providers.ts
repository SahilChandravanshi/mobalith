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

export interface GameDataProvider {
  getHeroes(signal?: AbortSignal): Promise<Hero[]>
  getItems(signal?: AbortSignal): Promise<Item[]>
  getEmblems(signal?: AbortSignal): Promise<Emblem[]>
  getBattleSpells(signal?: AbortSignal): Promise<BattleSpell[]>
  getTierLists(signal?: AbortSignal): Promise<TierList[]>
  getPatches(signal?: AbortSignal): Promise<Patch[]>
  getBuilds(signal?: AbortSignal): Promise<Build[]>
  getCounters(signal?: AbortSignal): Promise<Counter[]>
  getSynergies(signal?: AbortSignal): Promise<Synergy[]>
  getDraftRecommendations(signal?: AbortSignal): Promise<DraftRecommendation[]>
  getMetaTrends(signal?: AbortSignal): Promise<MetaTrend[]>
  getArticles(signal?: AbortSignal): Promise<Article[]>
}

export type MockDataSets = {
  [
    K in keyof GameDataProvider as K extends `get${infer Name}`
      ? Uncapitalize<Name>
      : never
  ]?: Awaited<ReturnType<GameDataProvider[K]>>
}
export class MockGameDataProvider implements GameDataProvider {
  constructor(private readonly data: MockDataSets = {}) {}
  getHeroes = async () => this.data.heroes ?? []
  getItems = async () => this.data.items ?? []
  getEmblems = async () => this.data.emblems ?? []
  getBattleSpells = async () => this.data.battleSpells ?? []
  getTierLists = async () => this.data.tierLists ?? []
  getPatches = async () => this.data.patches ?? []
  getBuilds = async () => this.data.builds ?? []
  getCounters = async () => this.data.counters ?? []
  getSynergies = async () => this.data.synergies ?? []
  getDraftRecommendations = async () => this.data.draftRecommendations ?? []
  getMetaTrends = async () => this.data.metaTrends ?? []
  getArticles = async () => this.data.articles ?? []
}
