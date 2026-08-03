import { relationshipService } from '../api/relationshipService'
import type { HeroRelationships } from '../model/relationship'

class RelationshipRepository {
  private relationships: HeroRelationships[] | null = null

  async getAll(): Promise<HeroRelationships[]> {
    if (this.relationships) {
      return this.relationships
    }

    this.relationships = await relationshipService.getRelationships()

    return this.relationships
  }

  async getByHeroId(heroId: number): Promise<HeroRelationships | undefined> {
    const relationships = await this.getAll()

    return relationships.find((item) => item.heroId === heroId)
  }
}

export const relationshipRepository = new RelationshipRepository()
