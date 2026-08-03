import { Link } from "react-router-dom";

import type { Hero } from "@/entities/hero";

import { Badge } from "@/shared/ui/Badge";

interface HeroRelationCardProps {
  hero: Hero;
  reason: string;
}

export function HeroRelationCard({
  hero,
  reason,
}: HeroRelationCardProps) {
  return (
    <Link
      to={`/heroes/${hero.slug}`}
      className="
        angular-frame
        block
        border
        border-ink/10
        bg-inset/50
        p-4
        transition-all
        hover:border-brand/30
        hover:bg-elevated
      "
    >
      <div className="flex gap-4">

        <img
          src={hero.images.square}
          alt={hero.name}
          className="
            angular-frame
            h-20
            w-20
            border
            border-ink/10
            bg-surface
            object-cover
            shrink-0
          "
        />

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="truncate text-lg font-bold">
              {hero.name}
            </h3>

            <Badge tone="brand">
              {hero.roles[0]}
            </Badge>

            <Badge tone="gold">
              {hero.tier}
            </Badge>

          </div>

          <p className="mt-1 text-sm text-muted">
            {hero.title}
          </p>

          <div className="mt-4 border-t border-ink/10 pt-3">

            <p className="text-sm leading-6 text-muted">
              {reason}
            </p>

          </div>

        </div>

      </div>
    </Link>
  );
}