import type { Hero } from "@/entities/hero/model/hero";

import { StatCard } from "@/shared/ui/StatCard";

interface HeroStatsCardsProps {
  hero: Hero;
}

export function HeroStatsCards({
  hero,
}: HeroStatsCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Win Rate"
        value={`${hero.rates?.winRate ?? 0}%`}
      />

      <StatCard
        label="Pick Rate"
        value={`${hero.rates?.pickRate ?? 0}%`}
      />

      <StatCard
        label="Ban Rate"
        value={`${hero.rates?.banRate ?? 0}%`}
      />
    </section>
  );
}