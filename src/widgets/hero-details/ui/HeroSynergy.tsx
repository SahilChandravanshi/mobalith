import type { Hero } from "@/entities/hero";

import { useHeroes } from "@/entities/hero";
import { HeroRelationCard } from "./HeroRelationCard";

interface HeroSynergyProps {
  hero: Hero;
}

export function HeroSynergy({
  hero,
}: HeroSynergyProps) {
  const { heroes } = useHeroes();

  const synergies = hero.synergies ?? [];

  if (synergies.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {synergies.map((ally) => {
        const relatedHero = heroes.find(
          (item) => item.id === ally.heroId
        );

        if (!relatedHero) {
          return null;
        }

        return (
          <HeroRelationCard
            key={relatedHero.id}
            hero={relatedHero}
            reason={ally.reason}
          />
        );
      })}
    </div>
  );
}