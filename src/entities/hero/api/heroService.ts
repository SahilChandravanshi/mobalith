import type { Hero } from "../model/hero";

const HEROES_URL = "/data/heroes.json";

class HeroService {
  async getHeroes(): Promise<Hero[]> {
    const response = await fetch(HEROES_URL);

    if (!response.ok) {
      throw new Error("Failed to load hero data.");
    }

    return response.json();
  }

  async getHero(slug: string): Promise<Hero | undefined> {
    const heroes = await this.getHeroes();

    return heroes.find((hero) => hero.slug === slug);
  }
}

export const heroService = new HeroService();