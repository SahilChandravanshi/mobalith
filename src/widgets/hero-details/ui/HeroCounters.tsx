import type { Hero } from "@/entities/hero";
import { useHeroes } from "@/entities/hero";

import { Card } from "@/shared/ui/Card";

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
    <Card title="Counters">
      <div className="grid gap-3">
        {counters.map((counter) => {
          const enemy = heroes.find(
            (h) => h.id === counter.heroId,
          );

          if (!enemy) {
            return null;
          }

          return (
            <HeroRelationCard
              key={enemy.id}
              hero={enemy}
              reason={counter.reason}
            />
          );
        })}
      </div>
    </Card>
  );
}