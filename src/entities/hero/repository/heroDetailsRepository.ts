import { heroRepository } from "./heroRepository";

import type {
  Hero,
  HeroSkin,
} from "../model/hero";

interface HeroSkinsEntry {
  heroId: number;
  skins: HeroSkin[];
}

const SKINS_URL = "/data/heroes/hero-skins.json";

class HeroDetailsRepository {
  async getHero(
    slug: string
  ): Promise<Hero | undefined> {
    const hero = await heroRepository.getBySlug(slug);

    if (!hero) {
      return undefined;
    }

    const skins = await fetch(SKINS_URL).then((r) =>
      r.json()
    );

    const skinEntry = (
      skins as HeroSkinsEntry[]
    ).find((entry) => entry.heroId === hero.id);

    return {
      ...hero,
      skins: skinEntry?.skins ?? [],
    };
  }
}

export const heroDetailsRepository =
  new HeroDetailsRepository();