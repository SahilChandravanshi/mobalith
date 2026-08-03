import { heroRepository } from "./heroRepository";

class HeroDetailsRepository {
  async getHero(slug: string) {
    return heroRepository.getBySlug(slug);
  }
}

export const heroDetailsRepository =
  new HeroDetailsRepository();