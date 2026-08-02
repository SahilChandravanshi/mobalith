import type { Hero } from "@/entities/hero";

import { Card } from "@/shared/ui/Card";

interface HeroStatsProps {
  hero: Hero;
}

const rows = [
  {
    label: "Durability",
    key: "durability",
  },
  {
    label: "Offense",
    key: "offense",
  },
  {
    label: "Skill Effects",
    key: "skillEffects",
  },
  {
    label: "Difficulty",
    key: "difficulty",
  },
] as const;

export function HeroStats({
  hero,
}: HeroStatsProps) {
  return (
    <Card>

      <h2 className="mb-6 text-xl font-bold">
        Hero Attributes
      </h2>

      <div className="space-y-5">

        {rows.map((row) => {
          const value = hero.stats[row.key];

          return (
            <div key={row.key}>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium">
                  {row.label}
                </span>

                <span className="text-sm font-bold text-brand">
                  {value}/10
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-surface">

                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{
                    width: `${value * 10}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </Card>
  );
}