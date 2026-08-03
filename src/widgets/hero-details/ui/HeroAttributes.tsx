import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface HeroAttributesProps {
  hero: Hero;
}

interface AttributeRowProps {
  label: string;
  value: number;
  color: string;
}

function AttributeRow({
  label,
  value,
  color,
}: AttributeRowProps) {
  return (
    <div
      className="
        angular-frame
        border
        border-ink/10
        bg-inset/40
        p-4
      "
    >
      <div className="mb-3 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold">
            {label}
          </p>

          <p className="text-xs text-muted">
            Hero Attribute
          </p>
        </div>

        <span
          className="text-2xl font-black"
          style={{ color }}
        >
          {value}
        </span>

      </div>

      <ProgressBar
        value={value}
        color={color}
      />
    </div>
  );
}

export function HeroAttributes({
  hero,
}: HeroAttributesProps) {
  return (
    <Card>

      <div className="mb-6">
        <h3 className="text-xl font-bold">
          Attribute Distribution
        </h3>

        <p className="mt-1 text-sm text-muted">
          Overall strengths of this hero.
        </p>
      </div>

      <div className="grid gap-4">

        <AttributeRow
          label="Durability"
          value={hero.stats.durability}
          color="#3b82f6"
        />

        <AttributeRow
          label="Offense"
          value={hero.stats.offense}
          color="#ef4444"
        />

        <AttributeRow
          label="Skill Effects"
          value={hero.stats.skillEffects}
          color="#8b5cf6"
        />

        <AttributeRow
          label="Difficulty"
          value={hero.stats.difficulty}
          color="#f59e0b"
        />

      </div>

    </Card>
  );
}