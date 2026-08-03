import { useState, useEffect } from "react";

import type { Hero } from "@/entities/hero";

import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

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

      <div className="flex flex-wrap gap-3">

        {hero.skills.map((item, index) => (
          <Button
            key={item.id}
            variant={
              selected === index
                ? "primary"
                : "secondary"
            }
            onClick={() => setSelected(index)}
          >
            {item.slot}
          </Button>
        ))}

      </div>

      <div className="mt-6 flex gap-6">

        <img
          src={skill.image}
          alt={skill.name}
          className="angular-frame
    border
    border-ink/10
    bg-inset/50
    p-4
    transition-colors
    hover:border-brand/30"
        />

        <div className="flex-1">

          <h3 className="text-2xl font-bold">
            {skill.name}
          </h3>

          <p className="mt-3 leading-7 text-muted">
            {skill.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted">

            {skill.cooldown && (
              <span>
                <strong>Cooldown:</strong> {skill.cooldown}
              </span>
            )}

            {skill.manaCost && (
              <span>
                <strong>Mana:</strong> {skill.manaCost}
              </span>
            )}

          </div>

        </div>

      </div>

    </Card>
  );
}