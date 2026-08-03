import { useEffect, useState } from "react";

import type { Hero } from "@/entities/hero";

import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";

interface HeroSkillsProps {
  hero: Hero;
}

export function HeroSkills({
  hero,
}: HeroSkillsProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(0);
  }, [hero.id]);

  if (hero.skills.length === 0) {
    return (
      <Card>
        <p className="text-muted">
          Skills for this hero haven't been added yet.
        </p>
      </Card>
    );
  }

  const skill = hero.skills[selected];

  return (
    <Card>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">

        {hero.skills.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(index)}
            className={`
              angular-frame
              border
              p-3
              text-left
              transition-all
              ${
                selected === index
                  ? "border-brand bg-brand/10"
                  : "border-ink/10 bg-inset/50 hover:border-brand/30 hover:bg-elevated"
              }
            `}
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              {item.slot}
            </p>

            <p className="mt-1 font-semibold">
              {item.name}
            </p>
          </button>
        ))}

      </div>

      <div className="grid gap-8 lg:grid-cols-[140px_1fr]">

        <div
          className="
            angular-frame
            border
            border-ink/10
            bg-inset/50
            p-4
          "
        >
          <img
            src={skill.image}
            alt={skill.name}
            className="mx-auto h-24 w-24 object-contain"
          />
        </div>

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-3xl font-bold">
              {skill.name}
            </h3>

            <Badge tone="brand">
              {skill.slot}
            </Badge>

          </div>

          <p className="mt-5 whitespace-pre-line leading-8 text-muted">
            {skill.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            {skill.cooldown && (
              <Badge tone="gold">
                Cooldown: {skill.cooldown}
              </Badge>
            )}

            {skill.manaCost && (
              <Badge tone="success">
                Mana: {skill.manaCost}
              </Badge>
            )}

          </div>

        </div>

      </div>

    </Card>
  );
}