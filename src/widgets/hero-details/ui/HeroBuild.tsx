import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";

interface HeroBuildProps {
  hero: Hero;
}

export function HeroBuild({
  hero,
}: HeroBuildProps) {
  const build = hero.recommendedBuild;

  if (!build || build.length === 0) {
    return null;
  }

  return (
    <Card title="Recommended Build">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {build.map((item) => (
          <div
            key={item.id}
            className="
              border
              border-ink/10
              bg-inset/50
              p-3
              text-center
            "
          >
            <img
              src={item.icon}
              alt={item.name}
              loading="lazy"
              className="
                mx-auto
                h-12
                w-12
                object-contain
              "
            />

            <p className="mt-2 text-xs text-muted">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}