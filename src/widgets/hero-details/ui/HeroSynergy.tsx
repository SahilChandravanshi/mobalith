import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";

interface HeroSynergyProps {
  hero: Hero;
}

export function HeroSynergy({
  hero,
}: HeroSynergyProps) {
  const synergy = hero.synergies;

  if (!synergy || synergy.length === 0) {
    return null;
  }

  return (
    <Card title="Synergy">
      <div className="space-y-3">
        {synergy.map((ally) => (
          <div
            key={ally.heroId}
            className="
              border
              border-ink/10
              bg-inset/50
              p-4
            "
          >
            <p className="font-semibold">
              Hero ID: {ally.heroId}
            </p>

            <p className="mt-1 text-sm text-muted">
              {ally.reason}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}