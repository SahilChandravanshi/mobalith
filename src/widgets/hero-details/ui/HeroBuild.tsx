import type { Hero } from "@/entities/hero/model/hero";

import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";

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

  return (
    <Card title="Recommended Build">

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {build.map((item) => (
          <article
            key={item.id}
            className="
              angular-frame
              border
              border-ink/10
              bg-inset/40
              p-4
              transition-all
              duration-200
              hover:border-brand/30
              hover:bg-elevated
              hover:-translate-y-1
            "
          >

            <div className="flex items-start gap-4">

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
                  shrink-0
                "
              />

              <div className="min-w-0 flex-1">

                <h3 className="truncate text-base font-bold">
                  {item.name}
                </h3>

                <div className="mt-2">
                  <Badge tone="gold">
                    {item.price.toLocaleString()} Gold
                  </Badge>
                </div>

              </div>

            </div>

            <div className="mt-4 border-t border-ink/10 pt-4">

              <p className="whitespace-pre-line text-sm leading-6 text-muted">
                {item.description}
              </p>

            </div>

          </article>
        ))}

      </div>

    </Card>
  );
}