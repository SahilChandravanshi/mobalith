import { Link } from "react-router-dom";
import type { Hero } from "../model/hero";

import { Badge } from "@/shared/ui/Badge";

interface HeroCardProps {
  hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
   <Link
  to={`/heroes/${hero.slug}`}
  className="block"
>
  <article
      className="
        angular-frame
        group
        overflow-hidden
        border
        border-ink/10
        bg-elevated
        transition-colors
        hover:border-brand/50
      "
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-inset">
        <img
          src={hero.images.square}
          alt={hero.name}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            bg-gradient-to-t
            from-black/80
            to-transparent
            px-4
            pb-4
            pt-10
          "
        >
          <h3 className="text-lg font-semibold text-white">
            {hero.name}
          </h3>

          <p className="text-xs text-zinc-300">
            {hero.title}
          </p>
        </div>
      </div>


      <div className="space-y-3 border-t border-ink/10 p-4">

        <div className="flex flex-wrap gap-2">
          {hero.roles.map((role) => (
            <Badge key={role}>
              {role}
            </Badge>
          ))}
        </div>


        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">
            Tier
          </span>

          <span className="font-semibold text-brand">
            {hero.tier}
          </span>
        </div>


        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            {hero.damageType}
          </span>

          <span>
            {hero.difficulty}
          </span>
        </div>

      </div>
     </article>
</Link>
  );
}