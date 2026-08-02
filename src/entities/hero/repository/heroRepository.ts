import { heroService } from "../api/heroService";
import type { Hero } from "../model/hero";

class HeroRepository {
  async getHeroes(): Promise<Hero[]> {
    return heroService.getHeroes();
  }

  async getHeroBySlug(
    slug: string
  ): Promise<Hero | undefined> {
    const heroes = await this.getHeroes();

    return heroes.find(
      (hero) => hero.slug === slug
    );
  }
}

export const heroRepository = new HeroRepository();