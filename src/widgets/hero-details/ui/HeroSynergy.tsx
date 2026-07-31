import type { HeroRelation } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";


interface HeroSynergyProps {
  synergy?: HeroRelation[];
}


export function HeroSynergy({
  synergy,
}: HeroSynergyProps) {

  if (!synergy || synergy.length === 0) {
    return null;
  }


  return (
    <Card title="Synergy">

      <div className="space-y-3">

        {synergy.map((hero) => (
          <div
            key={hero.heroId}
            className="
              border
              border-ink/10
              bg-inset/50
              p-4
            "
          >

            <p className="font-semibold">
              Hero ID: {hero.heroId}
            </p>

            <p className="mt-1 text-sm text-muted">
              {hero.reason}
            </p>

          </div>
        ))}

      </div>

    </Card>
  );
}