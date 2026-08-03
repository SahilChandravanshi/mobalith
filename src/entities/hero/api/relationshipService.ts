import type { HeroRelationships } from '../model/relationship'

const RELATIONSHIPS_URL = '/data/heroes/relationships.json'

class RelationshipService {
  async getRelationships(): Promise<HeroRelationships[]> {
    const response = await fetch(RELATIONSHIPS_URL)

    if (!response.ok) {
      throw new Error('Failed to fetch hero relationships.')
    }

    return response.json()
  }
}

export const relationshipService = new RelationshipService()
