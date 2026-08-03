import type { Hero } from "../model/hero";

const HEROES_URL = "/data/heroes/heroes.json";

class HeroService {
  async getHeroes(): Promise<Hero[]> {
    const response = await fetch(HEROES_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch heroes data.");
    }

    const data = await response.json();

    return data as Hero[];
  }
}

export const heroService = new HeroService();