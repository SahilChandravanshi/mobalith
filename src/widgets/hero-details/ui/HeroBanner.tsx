import type { Hero } from "@/entities/hero/model/hero";

import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";

interface HeroBannerProps {
  hero: Hero;
}

export function HeroBanner({
  hero,
}: HeroBannerProps) {
  return (
    <Card className="overflow-hidden p-0">

      <div
        className="relative h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.images.banner})`,
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />

        <div className="relative flex h-full items-end gap-6 p-8">

          <img
            src={hero.images.portrait}
            alt={hero.name}
            className="h-44 rounded-xl border border-white/10"
          />

          <div className="space-y-3">

            <div>

              <h1 className="text-5xl font-black">
                {hero.name}
              </h1>

              <p className="text-lg text-muted">
                {hero.title}
              </p>

            </div>

            <div className="flex flex-wrap gap-2">

              {hero.roles.map((role) => (
                <Badge
                  key={role}
                >
                  {role}
                </Badge>
              ))}

              <Badge>
                {hero.tier}
              </Badge>

              <Badge>
                {hero.damageType}
              </Badge>

              <Badge>
                {hero.difficulty}
              </Badge>

            </div>

          </div>

        </div>

      </div>

    </Card>
  );
}