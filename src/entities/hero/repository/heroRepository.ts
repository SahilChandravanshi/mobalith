import { heroService } from "../api/heroService";
import type { Hero } from "../model/hero";

class HeroRepository {
  private heroes: Hero[] | null = null;

  async getAll(): Promise<Hero[]> {
    if (this.heroes) {
      return this.heroes;
    }

    this.heroes = await heroService.getHeroes();

    return this.heroes;
  }

  async getBySlug(slug: string): Promise<Hero | undefined> {
    const heroes = await this.getAll();

    return heroes.find((hero) => hero.slug === slug);
  }

  async getById(id: number): Promise<Hero | undefined> {
    const heroes = await this.getAll();

    return heroes.find((hero) => hero.id === id);
  }

  async search(query: string): Promise<Hero[]> {
    const heroes = await this.getAll();

    const value = query.toLowerCase();

    return heroes.filter((hero) =>
      hero.name.toLowerCase().includes(value)
    );
  }
}

export const heroRepository = new HeroRepository();