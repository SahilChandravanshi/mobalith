import type { HeroSkill } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";

interface HeroSkillsProps {
  skills?: HeroSkill[];
}

export function HeroSkills({
  skills,
}: HeroSkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <Card title="Skills">
      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="
              border
              border-ink/10
              bg-inset/50
              p-4
            "
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">
                {skill.name}
              </h3>

              <span className="text-xs text-muted">
                {skill.type}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}