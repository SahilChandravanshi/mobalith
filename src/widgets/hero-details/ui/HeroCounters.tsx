import type { Hero } from "@/entities/hero";

import { useHeroes } from "@/entities/hero";
import { HeroRelationCard } from "./HeroRelationCard";

interface HeroCountersProps {
  hero: Hero;
}

export function HeroCounters({
  hero,
}: HeroCountersProps) {
  const { heroes } = useHeroes();

  const counters = hero.counters ?? [];

  if (counters.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {counters.map((counter) => {
        const relatedHero = heroes.find(
          (item) => item.id === counter.heroId
        );

        if (!relatedHero) {
          return null;
        }

        return (
          <HeroRelationCard
            key={relatedHero.id}
            hero={relatedHero}
            reason={counter.reason}
          />
        );
      })}
    </div>
  );
}