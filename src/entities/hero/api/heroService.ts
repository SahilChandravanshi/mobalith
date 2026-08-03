import type { Hero } from "../model/hero";

const HEROES_URL = `${import.meta.env.BASE_URL}data/heroes/heroes.json`;

class HeroService {
  async getHeroes(): Promise<Hero[]> {
    const response = await fetch(HEROES_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch heroes data.");
    }

    return response.json();
  }
}

export const heroService = new HeroService();