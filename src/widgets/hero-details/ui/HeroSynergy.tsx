import type { Hero } from "@/entities/hero";
import { useHeroes } from "@/entities/hero";

import { Card } from "@/shared/ui/Card";

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
    <Card title="Best Synergy">
      <div className="grid gap-3">
        {synergies.map((ally) => {
          const partner = heroes.find(
            (h) => h.id === ally.heroId,
          );

          if (!partner) {
            return null;
          }

          return (
            <HeroRelationCard
              key={partner.id}
              hero={partner}
              reason={ally.reason}
            />
          );
        })}
      </div>
    </Card>
  );
}