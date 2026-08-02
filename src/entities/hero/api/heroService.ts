import { fetchJson } from "@/shared/api/fetchJson";

import type { Hero } from "../model/hero";

const HEROES_URL = `${import.meta.env.BASE_URL}data/heroes.json`;

class HeroService {
  async getHeroes(): Promise<Hero[]> {
    return fetchJson<Hero[]>(HEROES_URL);
  }
}

export const heroService = new HeroService();