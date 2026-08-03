export interface HeroRelation {
  heroId: number
  reason: string
  score: number
}

export interface HeroRelationships {
  heroId: number

  counters: HeroRelation[]

  counteredBy: HeroRelation[]

  synergies: HeroRelation[]
}
