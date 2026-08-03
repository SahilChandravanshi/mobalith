import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";

interface HeroBuildProps {
  hero: Hero;
}

export function HeroBuild({
  hero,
}: HeroBuildProps) {
  const build = hero.recommendedBuild ?? [];

  if (build.length === 0) {
    return null;
  }
console.log(build);
  return (
    <Card title="Recommended Build">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {build.map((item) => (
          <div
            key={item.id}
            className="
              angular-frame
              border
              border-ink/10
              bg-inset/50
              p-4
              transition-colors
              hover:border-brand/30
              hover:bg-elevated
            "
          >
            <div className="flex items-center gap-4">
              <img
                src={item.icon}
                alt={item.name}
                loading="lazy"
                className="
                  angular-frame
                  h-16
                  w-16
                  border
                  border-ink/10
                  bg-surface
                  object-contain
                  p-2
                "
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-gold">
                  {item.price.toLocaleString()} Gold
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-ink/10 pt-3">
              <p className="whitespace-pre-line text-sm text-muted">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}