import type { Hero } from '@/entities/hero/model/hero'

import { Badge } from '@/shared/ui/Badge'
import { StatCard } from '@/shared/ui/StatCard'

interface HeroBannerProps {
  hero: Hero
}

export function HeroBanner({ hero }: HeroBannerProps) {
  return (
    <section className="angular-frame overflow-hidden border border-ink/10 bg-surface">
      <div
        className="relative min-h-[420px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero.images.banner})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/25" />

        <div className="relative flex h-full flex-col justify-end gap-8 p-8 lg:flex-row lg:items-end">
          <img
            src={hero.images.portrait}
            alt={hero.name}
            className="h-64 w-auto angular-frame border border-white/10 object-cover"
          />

          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">
                Mobile Legends Hero
              </p>

              <h1 className="mt-2 text-5xl font-black">{hero.name}</h1>

              <p className="mt-2 text-xl text-muted">{hero.title}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {hero.roles.map((role) => (
                <Badge key={role} tone="brand">
                  {role}
                </Badge>
              ))}

              {hero.lanes.map((lane) => (
                <Badge key={lane}>{lane}</Badge>
              ))}

              {hero.specialty.map((specialty) => (
                <Badge key={specialty} tone="success">
                  {specialty}
                </Badge>
              ))}

              <Badge tone="gold">Tier {hero.tier}</Badge>

              <Badge>{hero.damageType}</Badge>

              <Badge>{hero.difficulty}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Win Rate" value={`${hero.rates.winRate}%`} />

              <StatCard label="Pick Rate" value={`${hero.rates.pickRate}%`} />

              <StatCard label="Ban Rate" value={`${hero.rates.banRate}%`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
