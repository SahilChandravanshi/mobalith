import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";

interface HeroCountersProps {
  hero: Hero;
}

export function HeroCounters({
  hero,
}: HeroCountersProps) {
  const counters = hero.counters;

  if (!counters || counters.length === 0) {
    return null;
  }

  return (
    <Card title="Counters">
      <div className="space-y-3">
        {counters.map((counter) => (
          <div
            key={counter.heroId}
            className="
              border
              border-ink/10
              bg-inset/50
              p-4
            "
          >
            <p className="font-semibold">
              Hero ID: {counter.heroId}
            </p>

            <p className="mt-1 text-sm text-muted">
              {counter.reason}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}