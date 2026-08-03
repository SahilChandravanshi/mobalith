import { Link } from "react-router-dom";

import type { Hero } from "@/entities/hero";

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
      className="card block hover:border-brand/30"
    >
      <div className="flex items-center gap-4">

        <img
          src={hero.images.square}
          alt={hero.name}
          className="
            angular-frame
            h-16
            w-16
            object-cover
          "
        />

        <div className="min-w-0">

          <h3 className="font-semibold">
            {hero.name}
          </h3>

          <p className="mt-1 text-sm text-muted">
            {reason}
          </p>

        </div>

      </div>
    </Link>
  );
}