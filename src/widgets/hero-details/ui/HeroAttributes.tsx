import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface HeroAttributesProps {
  hero: Hero;
}

function Row({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {label}
        </span>

        <span className="text-sm text-muted">
          {value}/10
        </span>
      </div>

      <ProgressBar value={value} />
    </div>
  );
}

export function HeroAttributes({
  hero,
}: HeroAttributesProps) {
  return (
    <Card>
      <div className="space-y-6">

        <Row
          label="Durability"
          value={hero.stats.durability}
        />

        <Row
          label="Offense"
          value={hero.stats.offense}
        />

        <Row
          label="Skill Effects"
          value={hero.stats.skillEffects}
        />

        <Row
          label="Difficulty"
          value={hero.stats.difficulty}
        />

      </div>
    </Card>
  );
}