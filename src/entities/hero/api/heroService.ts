import type { Hero } from "../model/hero";

const HEROES_URL = `${import.meta.env.BASE_URL}data/heroes.json`;

class HeroService {
  async getHeroes(): Promise<Hero[]> {
    console.log("Fetching:", HEROES_URL);

    const response = await fetch(HEROES_URL, {
      cache: "no-store",
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch heroes data. (${response.status})`
      );
    }

    const data = await response.json();

    console.log(data);

    return data as Hero[];
  }
}

export const heroService = new HeroService();