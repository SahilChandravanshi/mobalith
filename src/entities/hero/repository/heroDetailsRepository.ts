import { heroRepository } from "./heroRepository";

import type {
  Hero,
  HeroSkin,
} from "../model/hero";

interface HeroSkinsEntry {
  heroId: number;
  skins: HeroSkin[];
}

const SKINS_URL =
  `${import.meta.env.BASE_URL}data/heroes/hero-skins.json`;

class HeroDetailsRepository {
  async getHero(
    slug: string
  ): Promise<Hero | undefined> {
    const hero = await heroRepository.getBySlug(slug);

    if (!hero) {
      return undefined;
    }

    const response = await fetch(SKINS_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch hero skins.");
    }

    const skins = (await response.json()) as HeroSkinsEntry[];

    const skinEntry = skins.find(
      (entry) => entry.heroId === hero.id
    );

    return {
      ...hero,
      skins: skinEntry?.skins ?? [],
    };
  }
}

export const heroDetailsRepository =
  new HeroDetailsRepository();